import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpWithoutInterceptorService } from '../../../service/http-without-interceptor.service';
import { EndPointConst } from '../../../constants/end-point.const';
import { HttpServerService } from '../../../service/http-server.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public server: HttpServerService, public httpNonInterceptor: HttpWithoutInterceptorService) { }

  listJobPost(filter: any): Observable<any> {
    let url = `${EndPointConst.FIND_MY_JOB_POST_PROFILE}?&page=${filter.page}&count=${filter.count}`;
    if(filter.search) {
      url += `&search=${filter.search}`
    }
    if(filter.location) {
      url += `&location=${filter.location}`
    }
    return  this.server.get(url, {});
  }

  findJobPost(id: any): Observable<any> {
    return  this.server.get(`${EndPointConst.FIND_JOB_POST_PROFILE}${id}`, {});
  }

  createJobPost(data: any): Observable<any> {
    return  this.server.post(EndPointConst.CREATE_JOB_POST_PROFILE, data, {});
  }

  updateJobPost(id: string, data: any): Observable<any> {
    return  this.server.put(`${EndPointConst.UPDATE_JOB_POST_PROFILE}${id}`, data, {});
  }

  getContries() {
    return  this.httpNonInterceptor.get(`${EndPointConst.GET_ALL_COUNTRY}`, {});
  }

  getState(data: any) {
    return  this.httpNonInterceptor.post(`${EndPointConst.GET_ALL_STATE}`, data, {});
  }

  getCity(data: any) {
    return  this.httpNonInterceptor.post(`${EndPointConst.GET_ALL_CITY}`, data, {});
  }

  getUserInfo() {
    return  this.server.get(`${EndPointConst.GET_USER_INFO}`, {});
  }
}
