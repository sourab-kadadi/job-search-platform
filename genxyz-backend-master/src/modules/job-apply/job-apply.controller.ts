import { Response, Request } from 'express';
import { Body, Controller, HttpStatus, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../exception-handler/http-exception.filter';
import { MongoExceptionFilter } from '../../exception-handler/mongo-exception.filter';
import { AllExceptionsFilter } from '../../exception-handler/exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { IModuleRes } from '../../common.service';
import { JobApplyService } from "./job-apply.service";
import {JobApplyDto } from './job-apply.dto';
@ApiTags('Job Post')
@Controller('job-apply')
@UseFilters(AllExceptionsFilter, HttpExceptionFilter, MongoExceptionFilter)
export class JobApplyController {
    constructor(private JobApplyService: JobApplyService) {}
    @UseGuards(AuthGuard('JWTaccessToken'))
    @Post()
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() JobApplyDto: JobApplyDto, @Req() Req: Request, @Res() Res: Response,) {
            let user :any = Req.user;
            JobApplyDto["candidateUserId"] = user.userId;
            JobApplyDto["candidateName"] = `${user.firstName} ${user.lastName}`;
            let result = await this.JobApplyService.createModule(JobApplyDto);
            Res.status(HttpStatus.CREATED).send(result);
    }
}
