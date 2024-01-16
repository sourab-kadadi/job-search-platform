import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWithoutInterceptorService } from 'src/app/service/http-without-interceptor.service';
import { EndPointConst } from '../../../constants/end-point.const';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public server: HttpWithoutInterceptorService) { }
  loginPartner(data: any): Observable<any> {
    return  this.server.post(EndPointConst.LOGIN_CLIENT, data, {});
  }
}
