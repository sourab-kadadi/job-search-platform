import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { InjectModel } from '@nestjs/mongoose';
import { FinCompany } from './fin-company.interface';
import { ESearchBy, FinCompanysDto, FinCompanysfindOneByIdRes, IFinCompanyfindManyRes, IFinCompanysMessage } from './fin-company.dto';

@Injectable()
export class FinCompanyService {
  constructor(@InjectModel('FinCompany') private readonly Module: Model<FinCompany>) {}

  async createModule(FinCompanysDto: FinCompanysDto): Promise<IModuleRes> {
    try {
      const createUser = new this.Module(FinCompanysDto);
      await createUser.save();
      return { status: true, message: IFinCompanysMessage.createdSuccess };
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(`${DuplicateArrayToString} Aleary Exist`, HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateModule(FinCompanysId: string, FinCompanysDto: FinCompanysDto): Promise<IModuleRes> {
    try {
      let result = await this.Module.updateOne({ _id: FinCompanysId }, { $set: FinCompanysDto });
      return { status: true, message: IFinCompanysMessage.updateSuccess };
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(DuplicateArrayToString + ' Aleary Exist', HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async deleteModule(FinCompanysId: string): Promise<IModuleRes> {
    try {
      await this.Module.deleteOne({ _id: FinCompanysId });
      return { status: true, message: IFinCompanysMessage.deleteSuccess };
    } catch (error) {
      throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneModule(FinCompanysId: string): Promise<FinCompanysfindOneByIdRes> {
    try {
      let result = await this.Module.findOne({ _id: FinCompanysId });
      if (result) {
        return { status: true, message: IFinCompanysMessage.foundSuccess, data: result };
      } else {
        return { status: false, message: IFinCompanysMessage.notFound, data: null };
      }
    } catch (error) {
      throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findManyModule(
    searchBy: ESearchBy,
    page: number,
    count: number,
    search: string,
    project: any,
  ): Promise<IFinCompanyfindManyRes> {
      try {
        count = Number(count || 0);
        page = Number(page || 0);
        let totalCount: any[] = [{ $count: 'count' }];
        let item: any[] = [
            { $sort: { "basic_details.company_name": 1 } },
            { $skip: page * count },
            { $limit: count },
            {$project: project }
        ];
      let match: any = {};
        if (search && search != '') {
           if (searchBy == ESearchBy.COMPANY_NAME) {
           match = {
            "basic_details.company_name": { $regex: new RegExp("^"+search, 'i') }
          };
        } else if (searchBy == ESearchBy.CIN) {
          match = {
            "CIN": { $regex: new RegExp("^"+search, 'i') }
          };
        }
          // match = { $text: { $search: search } };
         }
         if (match && match != {}) {
            item.unshift({ $match: match });
            totalCount.unshift({ $match: match });
          }
         let result = this.Module.aggregate(item);
         let resultCount = this.Module.count(match);
         let data = await Promise.all([result, resultCount]);
         if (data) {
          result = data[0];
          resultCount = data[1];
         }
          if (result.length) {
            return {
              status: true,
              message: IFinCompanysMessage.foundSuccess,
              data: result,
              totalCount: resultCount,
            };
        } else {
          return {
            status: true,
            message: IFinCompanysMessage.foundSuccess,
            data: [],
            totalCount: 0,
          };
        }
      } catch (error) {
      throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
}
