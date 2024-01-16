import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
@Injectable()
export class AuthGuardCandidateService implements CanActivate {
  constructor(public auth: AuthServiceService, public router: Router) {}
  canActivate(): boolean {
      const token = this.auth.jwtDecoder()
      console.log(token);
    if (!token || token == '' || token.userType != 'CANDIDATE') {
      this.router.navigate(['/candidate-login']);
      return false;
    }
    return true;
  }
}