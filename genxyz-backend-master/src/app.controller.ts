import { Controller, Request, UseGuards, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './modules/Auth/local.auth.guard';
import { UserService } from './modules/users/user.service';
import { JwtAuthGuard } from './modules/Auth/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly UserService: UserService) {}
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.'})
  // async login(@Request() req) {
  //   return this.UserService.login(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
