import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpWithoutInterceptorService {

  constructor(
    public http: HttpClient,
	public router: Router,
    public handler: HttpBackend
  ) {
    this.http = new HttpClient(handler)
   }

  get( url: string, option?: any): Observable<any> {
		return this.http.get(url, option);
	}

	post(url: string, data: any, option?: any): Observable<any> {
		return this.http.post(url, data, option);
	}

	put(url: string, data: any, option?: any): Observable<any> {
		return this.http.put(url, data, option);
	}

	delete(url: string, data?: any): Observable<any> {
		return this.http.delete(url, data);
	}
}
