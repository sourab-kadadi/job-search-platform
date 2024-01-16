import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Put, Param, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiConflictResponse, ApiBadRequestResponse, ApiRequestTimeoutResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { SubCategoryService } from "./sub-category.service";
import { IModuleRes } from 'src/common.service';
import { SubCategoryCreateDto, SubCategoryUpdateDto, ISubCategoryfindOneByIdRes, ISubCategoryfindManyRes } from './sub-category.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('SubCategory')
@Controller('sub-category')
export class SubCategoryController {
    constructor(private SubCategoryService: SubCategoryService) {}
    @UseGuards(AuthGuard('JWTaccessToken'))
    @Post("create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() SubCategoryDto: SubCategoryCreateDto, @Res() Res: Response) {
        try { 
            let result = await this.SubCategoryService.createModule(SubCategoryDto);
            Res.status(HttpStatus.CREATED).send(result);
           } catch (error) {
            Res.status(error.status? error.status : HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }
    @UseGuards(AuthGuard('JWTaccessToken'))
    @Put("update/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Update Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async update(@Param('_id') _id: string, @Body() SubCategoryDto: SubCategoryUpdateDto, @Res() Res: Response) {
        try {
            let result = await this.SubCategoryService.updateModule(_id, SubCategoryDto);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Delete("delete/:_id")
    @ApiOkResponse({type: IModuleRes,description: 'Deleted Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async delete(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.SubCategoryService.deleteModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("find/:_id")
    @ApiOkResponse({type: ISubCategoryfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.SubCategoryService.findOneModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("all/:categoryId?")
    @ApiOkResponse({type: ISubCategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findMany( @Res() Res: Response, @Query('page') page: number, @Query('count') count: number, @Query('filter')  filter?: string, @Param('categoryId') categoryId?: string) {
        try {
            let result = await this.SubCategoryService.findManyModule(page, count, categoryId, filter);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("active/:categoryId")
    @ApiOkResponse({type: ISubCategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findManyActive( @Res() Res: Response, @Query('page') page: number, @Query('count') count: number, @Param('categoryId') categoryId: string, @Query('filter')  filter?: string) {
        try {
            let result = await this.SubCategoryService.findManyModule(page, count, categoryId, filter, true);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("text/:text")
    @ApiOkResponse({type: ISubCategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findbyText(@Param('text') text: string, @Query('page') page: number, @Query('count') count: number, @Res() Res: Response) {
        try {
            let result = await this.SubCategoryService.findManyTextModule(text, page, count);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }
    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("groupByCategory/:categoryId?")
    @ApiOkResponse({type: ISubCategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findManyByCategoryId( @Res() Res: Response, @Query('page') page: number, @Query('count') count: number, @Query('filter')  filter?: string, @Param('categoryId') categoryId?: string) {
        try {
            let result = await this.SubCategoryService.findSubCategoryByCategoryGroup(page, count, filter, categoryId);
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
