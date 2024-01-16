import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Put, Param, Delete, Get, Query } from '@nestjs/common';
import { StorefindOneByIdRes, StoreRegistrationDto } from './storeRegistration.dto';
import {StoreRegistrationService} from './storeRegistration.service';
import { ApiResponse, ApiCreatedResponse, ApiConflictResponse, ApiRequestTimeoutResponse, ApiBadRequestResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
@ApiTags('Store')
@Controller('storeregistration')
export class StoreRegistationController {
    constructor(private StoreService: StoreRegistrationService) {}
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() StoreDto: StoreRegistrationDto, @Res() Res: Response) {
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
