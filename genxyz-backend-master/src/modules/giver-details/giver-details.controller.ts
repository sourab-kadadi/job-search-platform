import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
import { GiverDetailsfindOneByIdRes, GiverDetailsUpdateDto, GiverDetailsDto } from './giver-details.dto';
import { GiverDetailsService } from './giver-details.service';

@ApiTags('Giver Details')
@Controller('giver-details')
export class GiverDetailsController {

    constructor(private Service: GiverDetailsService) {}
    @Post("/create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() GiverDetailsDto: GiverDetailsDto, @Res() Res: Response) {
        try {
            let result = await this.Service.createModule(GiverDetailsDto);
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
    async update(@Param('_id') _id: string, @Body() GiverDetailsDto: GiverDetailsUpdateDto, @Res() Res: Response) {
        try {
            let result = await this.Service.updateModule(_id, GiverDetailsDto);
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
    @ApiOkResponse({type: GiverDetailsfindOneByIdRes,description: 'Found Successfully'})
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

}
