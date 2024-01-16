import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { LoginDto } from '../users/user.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'psw',
    });
  }

  async validate(email: string, psw: string): Promise<any> {
    try {
    let loginObj: LoginDto = {
      email: email,
      psw: psw
    }
     const user = await this.UserService.verifyUser(loginObj, 'CANDIDATE');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
 catch (error) {
  throw new UnauthorizedException();
}
  }
}