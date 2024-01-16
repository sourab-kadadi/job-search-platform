import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { ISubCategoryfindManyRes, ISubCategoryfindOneByIdRes, ISubCategoryMessage, SubCategoryCreateDto, SubCategoryUpdateDto } from './sub-category.dto';
import { SubCategory } from './sub-category.interface';
import * as mongoose from 'mongoose';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectModel('sub-category') private readonly Module: Model<SubCategory>,
      ) {}

      async createModule(SubCategoryDto: SubCategoryCreateDto): Promise<IModuleRes> {
        try {
          const createUser = new this.Module(SubCategoryDto);
          await createUser.save();
          return { message: ISubCategoryMessage.createdSuccess };
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
        SubCategoryId: string,
        SubCategoryDto: SubCategoryUpdateDto,
      ): Promise<IModuleRes> {
        try {
          let result = await this.Module.updateOne(
            { _id: SubCategoryId },
            { $set: SubCategoryDto },
          );
          return { status: true, message: ISubCategoryMessage.updateSuccess };
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
    
      async deleteModule(SubCategoryId: string): Promise<IModuleRes> {
        try {
          await this.Module.deleteOne({ _id: SubCategoryId });
          return { status: true, message: ISubCategoryMessage.deleteSuccess };
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async findOneModule(SubCategoryId: string): Promise<ISubCategoryfindOneByIdRes> {
        try {
          let result = await this.Module.findOne({ _id: SubCategoryId }, { __v: 0 });
          if (result) {
            return {
              status: true,
              message: ISubCategoryMessage.foundSuccess,
              data: result,
            };
          } else {
            return {
              status: false,
              message: ISubCategoryMessage.notFound,
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
        categoryId: string,
        filter: string,
        status?: boolean
      ): Promise<ISubCategoryfindManyRes> {
        try {
          let match:any = {};
          count = Number(count || 10);
          page = Number(page || 0);
          let totalCount: any = [{ $count: 'count' }];
          let item: any = [
            {$unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
            { $sort: { "category.name": 1, name: 1 } },
            { $skip: page * count },
            { $limit: count },
            { $project: {"categoryName": "$category.name", name: 1, image: 1, status: 1, categoryId: 1, type: 1 }},
          ]
          if (filter && filter != '') {
            let search = {
              $or: [{
                name: { $regex: new RegExp(filter, "i") }
              },
              { type: { $regex: new RegExp(filter, "i") } },
              { "category.name" : { $regex: new RegExp(filter, "i") } }
            ]
            };
            match = {...match, ...search}
          }
          if(categoryId) {
            match =  {...match, ...{categoryId: mongoose.Types.ObjectId(categoryId)}}
          }

          if (status != undefined && status != null && typeof status === "boolean") {
            match = { ...match, ...{status: status}};
          }
          if(match && match != {}) {
          item.unshift({$match: match});
          totalCount.unshift({$match: match});
          }
console.log(item);

          let lookUp = {
            $lookup: {
              from: "categorys",
              localField: "categoryId",
              foreignField: "_id",
              as: "category"
            }
        };
        item.unshift(lookUp);
        totalCount.unshift(lookUp);

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
              message: ISubCategoryMessage.foundSuccess,
              data: result[0].item,
              totalCount: result[0].totalCount[0].count,
            };
          } else {
            return {
              status: false,
              message: ISubCategoryMessage.notFound,
              data: null,
              totalCount: 0,
            };
          }
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }


      async findSubCategoryByCategoryGroup(
        page: number,
        count: number,
        filter: string,
        categoryId?: string
      ): Promise<ISubCategoryfindManyRes> {
        try {
          let match:any = {};
          count = Number(count || 10);
          page = Number(page || 0);
          let totalCount: any = [{ $count: 'count' }];
          let item: any = [
            { $sort: { "category.name": 1, name: 1 } },
            { $skip: page * count },
            { $limit: count },
            { $project: {"categoryName": "$category.name", name: 1, image: 1, status: 1, categoryId: 1, type: 1 }},
          ]
          if (filter && filter != '') {
            let search = {
              $or: [{
                name: { $regex: new RegExp(filter, "i") }
              },
              { type: { $regex: new RegExp(filter, "i") } },
              { "category.name" : { $regex: new RegExp(filter, "i") } }
            ]
            };
            match = {...match, ...search}
          }

          if(categoryId) {
            match =  {...match, ...{categoryId: mongoose.Types.ObjectId(categoryId)}}
          }


          if(match && match != {}) {
          item.unshift({$match: match});
          totalCount.unshift({$match: match});
          }

          let lookUp = {
            $lookup: {
              from: "categorys",
              localField: "categoryId",
              foreignField: "_id",
              as: "category"
            }
        };
        item.unshift(lookUp);
        totalCount.unshift(lookUp);

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
              message: ISubCategoryMessage.foundSuccess,
              data: result[0].item,
              totalCount: result[0].totalCount[0].count,
            };
          } else {
            return {
              status: false,
              message: ISubCategoryMessage.notFound,
              data: null,
              totalCount: 0,
            };
          }
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async findManyTextModule(search: string, page: number, count: number,): Promise<ISubCategoryfindManyRes> {
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
              message: ISubCategoryMessage.foundSuccess,
              data: result[0].item,
              totalCount: result[0].totalCount[0].count,
            };
          } else {
            return {
              status: false,
              message: ISubCategoryMessage.notFound,
              data: null,
              totalCount: null,
            };
          }
        } catch (error) {
          console.log(error);
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

}
