import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EndPointConst } from '../../../constants/end-point.const';
import { HttpServerService } from '../../../service/http-server.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public server: HttpServerService) { }

   findCandidate(id: any): Observable<any> {
    return  this.server.get(`${EndPointConst.FIND_CANDIDATE_PROFILE}${id}`, {});
  }

  createCandidate(data: any): Observable<any> {
    return  this.server.post(EndPointConst.CREATE_CANDIDATE_PROFILE, data, {});
  }

  updateCandidate(data: any): Observable<any> {
    return  this.server.put(EndPointConst.UPDATE_CANDIDATE_PROFILE, data, {});
  }

  getJobListCandidate(filter: any): Observable<any> {
    let url = `${EndPointConst.GET_JOB_LIST_CANDIDATE}?&page=${filter.page}&count=${filter.count}`;
    if(filter.search) {
      url += `&search=${filter.search}`
    }
    if(filter.location) {
      url += `&location=${filter.location}`
    }
    return  this.server.get(url, {});
  }

  findJobDetails(id: any): Observable<any> {
    return  this.server.get(`${EndPointConst.FIND_JOB_POST_PROFILE}${id}`, {});
  }

  findJobDetailsTotalApplication(id: any): Observable<any> {
    return  this.server.get(`${EndPointConst.FIND_JOB_POST_CANDIDATE}${id}`, {});
  }

  applyJob(data: any): Observable<any> {
    return  this.server.post(`${EndPointConst.APPLY_JOB}`, data, {});
  }


  updateUserInfo(data: any): Observable<any> {
    return  this.server.put(EndPointConst.UPDATE_CANDIDATE_USER_INFO, data, {});
  }

  getUserInfo(): Observable<any> {
    return  this.server.get(EndPointConst.GET_USER_INFO, {});
  }
}
