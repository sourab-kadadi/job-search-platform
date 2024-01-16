import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from './user-service.interface';
import { IUserServicefindOneByIdRes, IUserServiceMessage, UserServiceDto } from './user-service.dto';
import { IModuleRes } from '../../common.service';
@Injectable()
export class UserServiceService {
    constructor(
        @InjectModel('UserService') private readonly Module: Model<UserService>,
      ) {}

    async createModule(UserServiceDto: UserServiceDto): Promise<IModuleRes> {
        try {
          const createUser = new this.Module(UserServiceDto);
          await createUser.save();
          return { message: IUserServiceMessage.createdSuccess };
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
        UserServiceId: string,
        UserServiceDto: UserServiceDto,
      ): Promise<IModuleRes> {
        try {
          let result = await this.Module.updateOne(
            { _id: UserServiceId },
            { $set: UserServiceDto },
          );
          return { status: true, message: IUserServiceMessage.updateSuccess };
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

      async deleteModule(UserServiceId: string): Promise<IModuleRes> {
        try {
          await this.Module.deleteOne({ _id: UserServiceId });
          return { status: true, message: IUserServiceMessage.deleteSuccess };
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

      async findOneModule(UserServiceId: string): Promise<IUserServicefindOneByIdRes> {
        try {
          let result = await this.Module.findOne({ _id: UserServiceId }, { __v: 0 });
          if (result) {
            return {
              status: true,
              message: IUserServiceMessage.foundSuccess,
              data: result,
            };
          } else {
            return {
              status: false,
              message: IUserServiceMessage.notFound,
              data: null,
            };
          }
        } catch (error) {
           throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
