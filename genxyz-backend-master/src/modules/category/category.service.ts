import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.interface';
import { IModuleRes } from '../../common.service';
import {
  ICategoryMessage,
  CategoryCreateDto,
  CategoryUpdateDto,
  ICategoryfindOneByIdRes,
  ICategoryfindManyRes,
  ICategoryDropDownRes,
} from './category.dto';
import { IsBoolean } from 'class-validator';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categorys') private readonly Module: Model<Category>,
  ) {}

  async createModule(CategoryDto: CategoryCreateDto): Promise<IModuleRes> {
    try {
      const createUser = new this.Module(CategoryDto);
      await createUser.save();
      return { message: ICategoryMessage.createdSuccess };
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(
          DuplicateArrayToString.toUpperCase() + ' Aleary Exist',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateModule(
    CategoryId: string,
    CategoryDto: CategoryUpdateDto,
  ): Promise<IModuleRes> {
    try {
      let result = await this.Module.updateOne(
        { _id: CategoryId },
        { $set: CategoryDto },
      );
      return { status: true, message: ICategoryMessage.updateSuccess };
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(
          DuplicateArrayToString + ' Aleary Exist',
          HttpStatus.CONFLICT,
        );
      } else {
         throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async deleteModule(CategoryId: string): Promise<IModuleRes> {
    try {
      await this.Module.deleteOne({ _id: CategoryId });
      return { status: true, message: ICategoryMessage.deleteSuccess };
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneModule(CategoryId: string): Promise<ICategoryfindOneByIdRes> {
    try {
      let result = await this.Module.findOne({ _id: CategoryId }, { __v: 0 });
      if (result) {
        return {
          status: true,
          message: ICategoryMessage.foundSuccess,
          data: result,
        };
      } else {
        return {
          status: false,
          message: ICategoryMessage.notFound,
          data: null,
        };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findManyModule(
    page: number,
    count: number,
    filter?: string,
    status?: boolean
  ): Promise<ICategoryfindManyRes> {
    try {
      let match = {};
      count = Number(count || 10);
      page = Number(page || 0);
      let totalCount: any = [{ $count: 'count' }];
      let item: any = [
        { $sort: { _id: 1 } },
        { $skip: page * count },
        { $limit: count },
      ]
      if (filter && filter != '') {
        let search = {
          $or: [{
            name: { $regex: new RegExp(filter, "i") }
          },
          { type: { $regex: new RegExp(filter, "i") } }]
        };
        match = { ...match, ...search};
      }
      if (status != undefined && status != null && typeof status === "boolean") {
        match = { ...match, ...{status: status}};
      }
      if(match && match != {}) {
        item.unshift({$match: match});
        totalCount.unshift({$match: match});
        }
      let result = await this.Module.aggregate([
        {
          $facet: {
            item: item,
            totalCount: totalCount,
          },
        },
      ]);
      if (result && result[0].item.length > 0) {
        return {
          status: true,
          message: ICategoryMessage.foundSuccess,
          data: result[0].item,
          totalCount: result[0].totalCount[0].count,
        };
      } else {
        return {
          status: false,
          message: ICategoryMessage.notFound,
          data: null,
          totalCount: 0,
        };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findManyTextModule(search: string, page: number, count: number,): Promise<ICategoryfindManyRes> {
    try {
      let result = await this.Module.aggregate(
        [
          {
            $facet: {
              item: [
                {$match: { $text: { $search: search } }},
                { $sort: { _id: -1 } },
                { $skip: page * count },
                { $limit: count },
              ],
              totalCount: [{ $count: 'count' }],
            },
          }
        ]
    );
      if (result) {
        return {
          status: true,
          message: ICategoryMessage.foundSuccess,
          data: result[0].item,
          totalCount: result[0].totalCount[0].count,
        };
      } else {
        return {
          status: false,
          message: ICategoryMessage.notFound,
          data: null,
          totalCount: null,
        };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async findAllDropDownModule(): Promise<ICategoryDropDownRes> {
    try {
      let result = await this.Module.aggregate([{$project: {name: 1} }]);
      if (result) {
        return {
          status: true,
          message: ICategoryMessage.foundSuccess,
          data: result,
        };
      } else {
        return {
          status: false,
          message: ICategoryMessage.notFound,
          data: null,
        };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async lookUpSubCategoryDBFind(): Promise<ICategoryDropDownRes> {
    try {
      let result = await this.Module.aggregate([
        {
          $lookup: {
            from: "sub-categories",
            localField: "_id",
            foreignField: "categoryId",
            as: "subCategory"
          },
      },
      {$project: {"name": 1, "image.original": 1, "subCategory._id": 1, "subCategory.name": 1, "subCategory.image.original": 1}}
    ]);
      if (result) {
        return {
          status: true,
          message: ICategoryMessage.foundSuccess,
          data: result,
        };
      } else {
        return {
          status: false,
          message: ICategoryMessage.notFound,
          data: null,
        };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
