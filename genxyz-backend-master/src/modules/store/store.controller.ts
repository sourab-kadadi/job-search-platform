import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Put, Param, Delete, Get, Query } from '@nestjs/common';
import { StoreDto, StoreUpdateDto, StorefindOneByIdRes } from './store.dto';
import {StoreService} from './store.service';
import { ApiResponse, ApiCreatedResponse, ApiConflictResponse, ApiRequestTimeoutResponse, ApiBadRequestResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
@ApiTags('Store')
@Controller('store')
export class StoreController {
    constructor(private StoreService: StoreService) {}
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() StoreDto: StoreDto, @Res() Res: Response) {
        try {
            let result = await this.StoreService.createModule(StoreDto);
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
    async update(@Param('_id') _id: string, @Body() StoreDto: StoreUpdateDto, @Res() Res: Response) {
        try {
            let result = await this.StoreService.updateModule(_id, StoreDto);
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
            let result = await this.StoreService.deleteModule(_id);
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
    @ApiOkResponse({type: StorefindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.StoreService.findOneModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    // @Post("/location")
    // @ApiOkResponse({type: StorefindOneByIdRes,description: 'Found Successfully'})
    // @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    // @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    // @ApiRequestTimeoutResponse({description: 'Time Out'})
    // async findByGeo(@Query('latitued') latitued: number, @Query('logitude') logitude: number, @Res() Res: Response) {
    //     try {
    //         let result = await this.StoreService.findByGeoModule([Number(latitued), Number(logitude)]);
    //         if(result.status == true) {
    //         Res.status(HttpStatus.OK).send(result);
    //         } else {
    //         Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
    //         }
    //        } catch (error) {
    //         Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    //        }
    // }
}
