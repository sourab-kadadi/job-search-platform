import { Response, Request } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiConflictResponse, ApiBadRequestResponse, ApiRequestTimeoutResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
import { JobPostDto, JobPostUpdateDto, JobPostfindOneByIdRes, IJobPostfindManyRes } from './job-post.dto';
import { JobPostService } from './job-post.service';
import { HttpExceptionFilter } from '../../exception-handler/http-exception.filter';
import { MongoExceptionFilter } from '../../exception-handler/mongo-exception.filter';
import { AllExceptionsFilter } from '../../exception-handler/exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { ALL_FILED_PROJECT, LIST_PROJECT } from './job-post.obj';
@ApiTags('Job Post')
@Controller('job-post')
// @UseFilters(AllExceptionsFilter, HttpExceptionFilter, MongoExceptionFilter)
export class JobPostController {

    constructor(private JobPostService: JobPostService) {}
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() JobPostDto: JobPostDto, @Req() Req: Request, @Res() Res: Response,) {
            let user :any = Req.user;
            JobPostDto["giverId"] = user.userId;
            JobPostDto["companyName"] = user.companyName;
            let result = await this.JobPostService.createModule(JobPostDto);
            Res.status(HttpStatus.CREATED).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Put("/update/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Param('_id') _id: string, @Body() JobPostDto: JobPostUpdateDto, @Res() Res: Response) {
            let result = await this.JobPostService.updateModule(_id, JobPostDto);
            Res.status(HttpStatus.OK).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("all")
    @ApiOkResponse({type: IJobPostfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async listJobPost(@Query('page') page: number, @Query('count') count: number, @Query('search') search: string,  @Req() Req: Request, @Res() Res: Response) {
            let user :any = Req.user;
            let result = await this.JobPostService.findManyModule(page, count, search, LIST_PROJECT, user.userId);
            Res.status(HttpStatus.OK).send(result);
    }


    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("candidate")
    @ApiOkResponse({type: IJobPostfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async listJobPostCandidate(@Query('page') page: number, @Query('count') count: number, @Query('search') search: string,  @Req() Req: Request, @Res() Res: Response) {
            let result = await this.JobPostService.findManyModule(page, count, search, LIST_PROJECT);
            Res.status(HttpStatus.OK).send(result);
    }


    @Delete("/delete/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Deleted Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async delete(@Param('_id') _id: string, @Res() Res: Response) {
            let result = await this.JobPostService.deleteModule(_id);
            Res.status(HttpStatus.OK).send(result);
    }

    // @Get("all")
    // @ApiOkResponse({type: IJobPostfindManyRes,description: 'Found Successfully'})
    // @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    // @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    // @ApiRequestTimeoutResponse({description: 'Time Out'})
    // async findMany(@Query('page') page: number, @Query('count') count: number, @Query('filter') filter: string, @Res() Res: Response) {
    //         let result = await this.JobPostService.findManyModule(page, count, filter);
    //         Res.status(HttpStatus.OK).send(result);
    // }


    @Get("all/:giverId")
    @ApiOkResponse({type: IJobPostfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findManybyJobPostMany(@Param('giverId') giverId: string, @Query('page') page: number, @Query('count') count: number, @Query('search') search: string, @Res() Res: Response) {
            let result = await this.JobPostService.findManyModule(page, count, search, LIST_PROJECT, giverId);
            Res.status(HttpStatus.OK).send(result);
    }


    @Get("find/:_id")
    @ApiOkResponse({type: JobPostfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
            let result = await this.JobPostService.findOneModule(_id);
            Res.status(HttpStatus.OK).send(result);
    }


    @Get("text/:text")
    @ApiOkResponse({type: IJobPostfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findbyText(@Param('text') text: string, @Query('page') page: number, @Query('count') count: number, @Res() Res: Response) {
            let result = await this.JobPostService.findManyTextModule(text, page, count, LIST_PROJECT);
            Res.status(HttpStatus.OK).send(result);
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("/candidate/find/:_id")
    @ApiOkResponse({type: JobPostfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneApplicationForCandidate(@Param('_id') _id: string, @Req() Req: Request, @Res() Res: Response) {
            let user :any = Req.user;
            let result = await this.JobPostService.findOneModuleAndTotalApplication(_id, ALL_FILED_PROJECT, user.userId);
            Res.status(HttpStatus.OK).send(result);
    }


    @Get("/uplaod")
    @ApiOkResponse({type: JobPostfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async uplaodFileScript(Req: Request, @Res() Res: Response) {
            let result = await this.JobPostService.uplaodUrlToFile();
            Res.status(HttpStatus.OK).send(result);
    }
}
