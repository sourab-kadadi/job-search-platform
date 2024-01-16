import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPointConst } from '../../../constants/end-point.const';
import { HttpServerService } from '../../../service/http-server.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(public server: HttpServerService) { }

  signUpCustomer(data: any): Observable<any> {
    return  this.server.post(EndPointConst.CUSTOMER_SIGN_UP, data, {});
  }

  signUpCandidate(data: any): Observable<any> {
    return  this.server.post(EndPointConst.CANDIDATE_SIGN_UP, data, {});
  }

  signUpCompany(data: any): Observable<any> {
    return  this.server.post(EndPointConst.COMPANY_SIGN_UP, data, {});
  }
}
