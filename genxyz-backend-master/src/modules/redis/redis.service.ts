import { Request } from 'express';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redis from "redis";
import { ItokenExp } from '../../config/configration.dto';
import { RefreshTokenDto } from './redis.dto';
const redisClient = redis.createClient(Number(process.env.REDIS_PORT), process.env.REDIS_HOST);

redisClient.on("connect", () => {
  console.log("connected read");
});
redisClient.on("error", (err) => {
  console.log("Error read" + err);
});
@Injectable()
export class RedisService {
  constructor( private configService: ConfigService) {}

  async createRefreshToken(refreshToken: string, payload: any, req: Request): Promise<string> {
      try {
    let expiry = this.configService.get<ItokenExp>('expiryToken').refresh_token_exp;
    const browser: string = await this.identifyBrowser(req.headers["user-agent"]);
    const ipAddress: any = (req.headers["x-forwarded-for"] || req.connection.remoteAddress);
    redisClient.setex(`REFRESHTOKEN:${refreshToken}`, (60 * Number(expiry)), JSON.stringify({ payload, ...{browser: browser, ipAddress: ipAddress} }));
    return refreshToken;
      } catch (error) {
        throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
      }
}


// async getRefreshTokenInfo(refreshToken: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     redisClient.KEYS(`REFRESHTOKEN:${refreshToken}`, (error: any, data: any) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

async getValueFromRefreshToken(refreshToken: string): Promise<any> {
  try {
    return new Promise((resolve, reject) => {
      redisClient.GET(`REFRESHTOKEN:${refreshToken}`, (error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  } catch(error) {
    throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

private async  identifyBrowser(userAgent: any, elements?: any) {
    let regexps: any = {
      "Chrome": [/Chrome\/(\S+)/],
      "Firefox": [/Firefox\/(\S+)/],
      "MSIE": [/MSIE (\S+);/],
      "Opera": [
        /Opera\/.*?Version\/(\S+)/,     /* Opera 10 */
        /Opera\/(\S+)/                  /* Opera 9 and older */
      ],
      "Safari": [/Version\/(\S+).*?Safari\//]
    },
      re, m, browser, version;
    if (userAgent === undefined)
      userAgent = navigator.userAgent;
    if (elements === undefined)
      elements = 2;
    else if (elements === 0)
      elements = 1337;
    for (browser in regexps)
      while (re = regexps[browser].shift())
        if (m = userAgent.match(re)) {
          version = (m[1].match(new RegExp("[^.]+(?:\.[^.]+){0," + --elements + "}")))[0];
          return browser + " " + version;
        }
    return null;
  }


}
