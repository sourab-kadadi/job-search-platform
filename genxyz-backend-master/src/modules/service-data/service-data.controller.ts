import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
import {ServiceDataService } from './service-data.service';
import { ServiceDataDto } from './service-data.dto';

@ApiTags('ServiceData')
@Controller('service-data')
export class ServiceDataController {
    constructor(private ServiceDataService: ServiceDataService) {}
    @Post("create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() ServiceDataDto: ServiceDataDto, @Res() Res: Response) {
        try {
            let result = await this.ServiceDataService.createModule(ServiceDataDto);
            Res.status(HttpStatus.CREATED).send(result);
           } catch (error) {
            Res.status(error.status? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }
}
