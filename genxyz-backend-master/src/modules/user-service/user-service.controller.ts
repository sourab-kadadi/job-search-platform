
import { Request, Response } from 'express';
import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiRequestTimeoutResponse } from '@nestjs/swagger';
import { IModuleRes } from 'src/common.service';
import { IUserServicefindOneByIdRes, UserServiceDto } from './user-service.dto';
import { UserServiceService } from './user-service.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('user-service')
export class UserServiceController {
    CategoryService: any;
    constructor(private Service: UserServiceService) {}

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Post("create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() UserServiceDto: UserServiceDto, @Req() Req: Request, @Res() Res: Response) {
        try {
            let user :any = Req.user;
            UserServiceDto.profileId = user.profileId;
            let result = await this.Service.createModule(UserServiceDto);
            Res.status(HttpStatus.CREATED).send(result);
           } catch (error) {
            Res.status(error.status? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Put("update/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Param('_id') _id: string, @Body() UserServiceDto: UserServiceDto, @Req() Req: Request, @Res() Res: Response) {
        try {
            let user :any = Req.user;
            UserServiceDto.profileId = user.profileId;
            let result = await this.Service.updateModule(_id, UserServiceDto);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.BAD_REQUEST).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }
}