import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from 'src/common.service';
import { CandidateProfileUpdateDto, CandidateProfilefindOneByIdRes, CandidateProfileDto } from '../candidate-profile/candidate-profile.dto';
import { CandidateProfileService } from './candidate-profile.service';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from '../../exception-handler/http-exception.filter';
import { MongoExceptionFilter } from '../../exception-handler/mongo-exception.filter';
import { AllExceptionsFilter } from '../../exception-handler/exception.filter';

@ApiTags('Candidate Profile')
@Controller('candidate-profile')
@UseFilters(AllExceptionsFilter, HttpExceptionFilter, MongoExceptionFilter)
export class CandidateProfileController {
    constructor(private Service: CandidateProfileService){}
    @UseGuards(AuthGuard('JWTaccessToken'))
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() CandidateProfileDto: CandidateProfileDto, @Req() Req: Request, @Res() Res: Response) {
            let user :any = Req.user;
            console.log(user);
            CandidateProfileDto["userId"] = user.userId;
            console.log(CandidateProfileDto);
            let result = await this.Service.createModule(CandidateProfileDto);
            Res.status(HttpStatus.CREATED).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Put("/update")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Body() CandidateProfileDto: CandidateProfileUpdateDto,  @Req() Req: Request, @Res() Res: Response) {
            let user :any = Req.user;
            let result = await this.Service.updateModule(user.userId, CandidateProfileDto);
            Res.status(HttpStatus.OK).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Delete("/delete/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Deleted Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async delete(@Param('_id') _id: string, @Res() Res: Response) {
            let result = await this.Service.deleteModule(_id);
            Res.status(HttpStatus.OK).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("find/:_id")
    @ApiOkResponse({type: CandidateProfilefindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
            console.log(_id);
            let result = await this.Service.findOneModule(_id);
            Res.status(HttpStatus.OK).send(result);
    }
}
