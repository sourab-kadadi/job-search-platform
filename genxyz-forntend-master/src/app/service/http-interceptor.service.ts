import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { catchError, switchMap, take, finalize } from 'rxjs/operators';
import { EndPointConst } from '../constants/end-point.const';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
	behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null as any);

  constructor(public AuthService: AuthServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    return next.handle(this.setTokenHeader(request)).pipe(
      catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              return this.retryHttp(request, next);
            }
            return observableThrowError(error.error);
          }
      })
    )

  }


  private retryHttp(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url !== EndPointConst.REFRESH_TOKEN) {
      // Rest the token and wait
      this.behaviorSubject.next(null as any);
      return this.AuthService.refreshToken().pipe(
        switchMap((access_token: any) => {
          if (access_token) {
            this.behaviorSubject.next(access_token);
            let token = JSON.parse(localStorage.getItem("token") || "{}");
            token.access_token = access_token;
            localStorage.setItem('token', JSON.stringify(token));
            return next.handle(this.setTokenHeader(request));
          }
          return of(this.AuthService.logout())
        }),
        catchError(err => {
          if (err.status === 401) {
            this.AuthService.moveUserOut();
          }
          return observableThrowError(err);
        }),
        finalize(() => {
          return of({}) as Observable<HttpEvent<any>>;
        })
      )
    } else {
			return this.behaviorSubject
				.pipe(take(1),
					switchMap(token => {
						if (token) {
							return next.handle(this.setTokenHeader(request));
						}
            this.AuthService.moveUserOut();
						return of({}) as Observable<HttpEvent<any>>;
					}));
    }
  }


  private setTokenHeader(request: HttpRequest<any>): HttpRequest<any> {
		return request.clone({ setHeaders: { Authorization: `${this.AuthService.getAccessToken()}` } });
	}


}
