import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IjwtTokenSecrate } from 'src/config/configration.dto';
import { Request } from 'express';


@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(Strategy, 'JWTrefreshToken') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest:  ExtractJwt.fromExtractors([(Req: Request) => {
        return Req?.cookies?.RefreshToken;
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<IjwtTokenSecrate>("jwtSecrate.refresh_token_secrate"),
    });
  }

  async validate(payload: any, Req: Request) {
    const refreshToken = Req.cookies?.RefreshToken;
  }
}