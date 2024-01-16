import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { EndPointConst } from '../constants/end-point.const';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ConstantPool } from '@angular/compiler';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn : boolean = false;
  constructor(
    private http: HttpClient,
		private router: Router,
  ) { }

  getAccessToken() {
    let getSession = JSON.parse(localStorage.getItem("token") ||  '{}');
    if (getSession) {
      this.isLoggedIn = true;
      return getSession.access_token;
    }
    this.isLoggedIn = false;
    return '';
  }

  refreshToken(): any {
		const token = JSON.parse(localStorage.getItem('token') ||  '{}');
		const refreshTokne = token.refresh_token;
    console.log("inside", refreshTokne);
    if (refreshTokne) {
      return this.http.post(`${EndPointConst.REFRESH_TOKEN}`, {refreshToken: refreshTokne}).pipe(
        map(res => {
          return res;
        }, (err: any) => {
           this.moveUserOut();
           return null;
        })
      )
    } else {
       this.moveUserOut();
       return null;
    }
  }


  logout() {
		const token = JSON.parse(localStorage.getItem('token') || '{}');
		const refreshToken = token.refresh_token;
    if (refreshToken) {
     this.http.post(`${EndPointConst.LOGOUT}`, {refreshToken: refreshToken})
    }
    localStorage.removeItem('token');
    // this.moveUserOut();
  }


  moveUserOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }

  jwtDecoder() {
    const helper = new JwtHelperService();
    let token = this.getAccessToken();
    if(token != '') {
    return helper.decodeToken(token);
    } else {
      return '';
    }
  }
}
