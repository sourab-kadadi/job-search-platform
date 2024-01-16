import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Put, Param, Delete, Get, Query, UseFilters } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiConflictResponse, ApiBadRequestResponse, ApiRequestTimeoutResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { IModuleRes } from '../../common.service';
import { CreateCatalogDto, UpdateCatalogDto, CatalogfindOneByIdRes, ICatalogfindManyRes } from './catalog.dto';
import { AllExceptionsFilter } from '../../exception-handler/exception.filter';
import { HttpExceptionFilter } from '../../exception-handler/http-exception.filter';
import { MongoExceptionFilter } from '../../exception-handler/mongo-exception.filter';

@ApiTags('Catalog')
@Controller('catalog')
@UseFilters(AllExceptionsFilter, HttpExceptionFilter, MongoExceptionFilter)
export class CatalogController {
    constructor(private Service: CatalogService) {}

    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() CreateCatalogDto: CreateCatalogDto, @Res() Res: Response) {
            let result = await this.Service.createModule(CreateCatalogDto);
            Res.status(HttpStatus.CREATED).send(result);
    }


    @Put("/update/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Param('_id') _id: string, @Body() UpdateCatalogDto: UpdateCatalogDto, @Res() Res: Response) {
            let result = await this.Service.updateModule(_id, UpdateCatalogDto);
            Res.status(HttpStatus.OK).send(result);
    }


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


    @Get("find/:_id")
    @ApiOkResponse({type: CatalogfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
            let result = await this.Service.findOneModule(_id);
            Res.status(HttpStatus.OK).send(result);
    }
    

    @Get('active/all')
    @ApiOkResponse({ type: ICatalogfindManyRes, description: 'Found Successfully' })
    @ApiBadRequestResponse({ type: IModuleRes, description: 'Bad Request' })
    @ApiInternalServerErrorResponse({ type: IModuleRes, description: 'Internal Server Error' })
    @ApiRequestTimeoutResponse({ description: 'Time Out' })
    async findManyActive(
      @Res() Res: Response,
      @Query('page') page: number,
      @Query('count') count: number,
      @Query('filter') filter: string,
      @Query('status') status?: string,
    ) {
        let result = await this.Service.findManyModule(page, count, filter, true);
          Res.status(HttpStatus.OK).send(result);
    }

}
