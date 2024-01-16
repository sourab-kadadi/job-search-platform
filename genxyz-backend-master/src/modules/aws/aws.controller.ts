import { Response } from 'express';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { AwsService } from './aws.service';
import { IModuleRes } from '../../common.service';
import { PresignedPost } from 'aws-sdk/clients/s3';
@ApiTags('data-storage')
@Controller('aws')
export class AwsController {
    constructor(private Service: AwsService) {}

    @Get("preSignedUrl")
    @ApiOkResponse({type: PresignedPost,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async getSignedUrl( @Res() Res: Response) {
        try {
            let result = await this.Service.getSignedUrl({filePath: 'images'});
            Res.status(HttpStatus.OK).send({status: true, message: 'Pre-Signed Url', data: result});
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }
}
