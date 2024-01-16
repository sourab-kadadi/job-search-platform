import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { ServiceDataDto, IServiceDataMessage, IServiceDatafindOneByIdRes } from './service-data.dto';
import { ServiceData } from './service-data.interface';

@Injectable()
export class ServiceDataService {
    constructor(
        @InjectModel('ServiceData') private readonly Module: Model<ServiceData>,
      ) {}

      async createModule(ServiceDataDto: ServiceDataDto): Promise<IModuleRes> {
        try {
          const createUser = new this.Module(ServiceDataDto);
          await createUser.save();
          return { message: IServiceDataMessage.createdSuccess };
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
        ServiceDataId: string,
        ServiceDataDto: ServiceDataDto,
      ): Promise<IModuleRes> {
        try {
          let result = await this.Module.updateOne(
            { _id: ServiceDataId },
            { $set: ServiceDataDto },
          );
          return { status: true, message: IServiceDataMessage.updateSuccess };
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

      async deleteModule(ServiceDataId: string): Promise<IModuleRes> {
        try {
          await this.Module.deleteOne({ _id: ServiceDataId });
          return { status: true, message: IServiceDataMessage.deleteSuccess };
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async findOneModule(ServiceDataId: string): Promise<IServiceDatafindOneByIdRes> {
        try {
          let result = await this.Module.findOne({ _id: ServiceDataId }, { __v: 0 });
          if (result) {
            return {
              status: true,
              message: IServiceDataMessage.foundSuccess,
              data: result,
            };
          } else {
            return {
              status: false,
              message: IServiceDataMessage.notFound,
              data: null,
            };
          }
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
