import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

// tslint:disable-next-line: import-blacklist
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpServerService {
	constructor(
		public http: HttpClient,
		public router: Router,
	) {
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
