import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
import { FinCompanyService } from './fin-company.service';
import { ESearchBy, FinCompanysDto, FinCompanysfindOneByIdRes, IFinCompanyfindManyRes } from './fin-company.dto';
import { COMPANY_LIST_PROJECT } from './fin-company.obj';
@ApiTags('Financialal Companys')
@Controller('fin-company')
export class FinCompanyController {

    constructor(private Service: FinCompanyService) {}
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() FinCompanysDto: FinCompanysDto, @Res() Res: Response) {
        try {
            let result = await this.Service.createModule(FinCompanysDto);
            if(result.status == true) {
            Res.status(HttpStatus.CREATED).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    @Put("/update/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Param('_id') _id: string, @Body() FinCompanysDto: FinCompanysDto, @Res() Res: Response) {
        try {
            let result = await this.Service.updateModule(_id, FinCompanysDto);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    @Delete("/delete/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Deleted Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async delete(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.Service.deleteModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    @Get("find/:_id")
    @ApiOkResponse({type: FinCompanysfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.Service.findOneModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    @Get("company-list")
    @ApiOkResponse({type: IFinCompanyfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findManybyJobPostMany(@Query('searchBy') searchBy: ESearchBy, @Query('page') page: number, @Query('count') count: number, @Query('search') search: string, @Res() Res: Response) {
            let result = await this.Service.findManyModule(searchBy, page, count, search, COMPANY_LIST_PROJECT);
            Res.status(HttpStatus.OK).send(result);
    }
}
