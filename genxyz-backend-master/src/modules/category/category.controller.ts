import { Response } from 'express';
import { Controller, Post, Body, Res, HttpStatus, Put, Param, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiCreatedResponse, ApiConflictResponse, ApiBadRequestResponse, ApiRequestTimeoutResponse, ApiOkResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { IModuleRes } from '../../common.service';
import { CategoryUpdateDto, CategoryCreateDto, ICategoryfindOneByIdRes, ICategoryfindManyRes } from './category.dto';
import { idproofType } from './category.static';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private CategoryService: CategoryService) {}

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Post("create")
    @ApiCreatedResponse({type: IModuleRes,description: 'Created Successfully'})
    @ApiConflictResponse({type: IModuleRes,description: 'Conflict'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async Create(@Body() CategoryDto: CategoryCreateDto, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.createModule(CategoryDto);
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
    async update(@Param('_id') _id: string, @Body() CategoryDto: CategoryUpdateDto, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.updateModule(_id, CategoryDto);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.BAD_REQUEST).send(result);
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
            let result = await this.CategoryService.deleteModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.BAD_REQUEST).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("find/:_id")
    @ApiOkResponse({type: ICategoryfindOneByIdRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findOneById(@Param('_id') _id: string, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.findOneModule(_id);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("all")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findMany(@Query('page') page: number, @Query('count') count: number, @Query('filter') filter: string, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.findManyModule(page, count, filter);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("active/all")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findManyActive(@Query('page') page: number, @Query('count') count: number, @Query('filter') filter: string, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.findManyModule(page, count, filter, true);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("text/:text")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findbyText(@Param('text') text: string, @Query('page') page: number, @Query('count') count: number, @Res() Res: Response) {
        try {
            let result = await this.CategoryService.findManyTextModule(text, page, count);
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("drop-down/all")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async findAllDropDown(@Res() Res: Response) {
        try {
            let result = await this.CategoryService.findAllDropDownModule();
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("category-list/drop-down/all")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async lookUpSubCategoryDBFind(@Res() Res: Response) {
        try {
            let result = await this.CategoryService.lookUpSubCategoryDBFind();
            if(result.status == true) {
            Res.status(HttpStatus.OK).send(result);
            } else {
            Res.status(HttpStatus.NOT_FOUND).send(result);
            }
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }

    @UseGuards(AuthGuard('JWTaccessToken'))
    @Get("id-details")
    @ApiOkResponse({type: ICategoryfindManyRes,description: 'Found Successfully'})
    @ApiBadRequestResponse({type: IModuleRes,description: 'Bad Request'})
    @ApiInternalServerErrorResponse({type: IModuleRes,description: 'Internal Server Error'})
    @ApiRequestTimeoutResponse({description: 'Time Out'})
    async idDetails(@Res() Res: Response) {
        try {
            let result = idproofType;
            Res.status(HttpStatus.OK).send(result);
           } catch (error) {
            Res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
           }
    }


}
