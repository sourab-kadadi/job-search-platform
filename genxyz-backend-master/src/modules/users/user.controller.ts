import { Controller, Get, Post, Body, HttpStatus, Res, UseGuards, Req, UnauthorizedException, Put } from '@nestjs/common';
import {UserDto, LoginDto, IRenewRefreshToken, UpdateUserDto} from './user.dto';
import {UserService} from './user.service';
import { Response, Request } from 'express';
import { LocalAuthGuard } from '../Auth/local.auth.guard';
import { RedisService } from '../redis/redis.service';
import { UserType } from './user.interface';
import { LocalClientAuthGuard } from '../Auth/local-client.auth.guard';
import { AuthGuard } from '@nestjs/passport';
@Controller("auth")
export class UserController {

    constructor(private readonly UserService: UserService, public RedisService: RedisService) {}
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Body() LoginDto: LoginDto, @Res() Res: Response, @Req() Req: Request) {
        try {
         let result = await this.UserService.login(LoginDto);
         let token = {
            refresh_token: await this.RedisService.createRefreshToken(result.refreshToken.token, result.payload, Req),
            access_token: result.accessToken.token
        };
         Res.setHeader('Set-Cookie', [result.accessToken.cookies, result.refreshToken.cookies]);
         Res.status(HttpStatus.OK).send(token);
        } catch (error) {
            Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
     }


     @UseGuards(LocalClientAuthGuard)
     @Post("/login-client")
     async loginCandidate(@Body() LoginDto: LoginDto, @Res() Res: Response, @Req() Req: Request) {
         try {
          let result = await this.UserService.login(LoginDto);
          let token = {
             refresh_token: await this.RedisService.createRefreshToken(result.refreshToken.token, result.payload, Req),
             access_token: result.accessToken.token
         };
          Res.setHeader('Set-Cookie', [result.accessToken.cookies, result.refreshToken.cookies]);
          Res.status(HttpStatus.OK).send(token);
         } catch (error) {
             Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
         }
      }

    @Post("/signUp")
   async signUp(@Body() UserDto: UserDto, @Res() Res: Response) {
       try {
         UserDto['userType'] = UserType.CUSTOMER;
        let result = await this.UserService.CreateUser(UserDto);
        Res.status(HttpStatus.ACCEPTED).send(result);
       } catch (error) {
        Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
       }
    }

    @Post("/partner/signUp")
    async signUpPartner(@Body() UserDto: UserDto, @Res() Res: Response) {
        try {
         UserDto['userType'] = UserType.PARTNER;
         let result = await this.UserService.CreateUser(UserDto);
         Res.status(HttpStatus.ACCEPTED).send(result);
        } catch (error) {
         Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
     }


     @Post("/agent/signUp")
     async signUpAgent(@Body() UserDto: UserDto, @Res() Res: Response) {
         try {
          UserDto['userType'] = UserType.AGENT;
          let result = await this.UserService.CreateUser(UserDto);
          Res.status(HttpStatus.ACCEPTED).send(result);
         } catch (error) {
          Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
         }
      }

      @Post("/company/signUp")
      async signUpCompany(@Body() UserDto: UserDto, @Res() Res: Response) {
          try {
           UserDto['userType'] = UserType.COMPANY;
           let result = await this.UserService.CreateUser(UserDto);
           Res.status(HttpStatus.ACCEPTED).send(result);
          } catch (error) {
           Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
          }
       }

       @Post("/candidate/signUp")
       async signUpCandidate(@Body() UserDto: UserDto, @Res() Res: Response) {
           try {
            UserDto['userType'] = UserType.CANDIDATE;
            let result = await this.UserService.CreateUser(UserDto);
            Res.status(HttpStatus.ACCEPTED).send(result);
           } catch (error) {
            Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
        }


    @Post("/renew-token")
    async renewRefreshToken(@Body() renewToken: IRenewRefreshToken, @Res() Res: Response) {
        try {
         let result = await this.RedisService.getValueFromRefreshToken(renewToken.refreshToken);
         if (result) {
            console.log(result);
            result = JSON.parse(result);
          let accessToken = await this.UserService.generateAccessToken(result.payload);
         await this.UserService.updateActiveTime(result.userId);
         Res.status(HttpStatus.ACCEPTED).send(accessToken);
         } else {
            throw new UnauthorizedException();
         }
        } catch (error) {
           if (error.status) {
            Res.status(error.status).send(error.response);
           } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
        }
     }

     @UseGuards(AuthGuard('JWTaccessToken'))
     @Put("/candidate/update")
     async updateUser(@Body() UpdateUser: UpdateUserDto, @Req() Req: Request, @Res() Res: Response) {
         try {
          let user :any = Req.user;
          let result = await this.UserService.updateUser(user.userId, UpdateUser);
          Res.status(HttpStatus.ACCEPTED).send(result);
         } catch (error) {
          Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
         }
      }

    @UseGuards(AuthGuard('JWTaccessToken'))
     @Put("/partner/update")
     async updateCompany(@Body() UpdateUser: UpdateUserDto, @Req() Req: Request, @Res() Res: Response) {
         try {
          let user :any = Req.user;
          let result = await this.UserService.updateUser(user.userId, UpdateUser);
          Res.status(HttpStatus.ACCEPTED).send(result);
         } catch (error) {
          Res.status(error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
         }
      }

      @UseGuards(AuthGuard('JWTaccessToken'))
      @Get("/user")
      async userById(@Req() Req: Request, @Res() Res: Response) {
           let user :any = Req.user;
           let result = await this.UserService.findUserById(user.userId);
           Res.status(HttpStatus.ACCEPTED).send(result);
       }
}