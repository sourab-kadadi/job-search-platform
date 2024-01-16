import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { ProfileDto, ProfilefindOneByIdRes, ProfileUpdateDto } from './profile.dto';
import { IProfileMessage, Profile } from './profile.interface';
@Injectable()
export class ProfileService {
    constructor(@InjectModel('Profile') private readonly Module: Model<Profile>) { }
        async createModule(ProfilesDto: ProfileDto): Promise<IModuleRes> {
            try {
              const createUser = new this.Module(ProfilesDto);
              await createUser.save();
              return { status: true, message: IProfileMessage.createdSuccess };
            } catch (error) {
              console.log(error);
              if (error.code && error.code == 11000) {
                let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
                let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
                throw new HttpException(`${DuplicateArrayToString} Aleary Exist`, HttpStatus.CONFLICT);
              } else {
                 throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
              }
            }
          }

          async updateModule(ProfilesId: string, ProfilesDto: ProfileUpdateDto): Promise<IModuleRes> {
            try {
              await this.Module.updateOne({ _id: ProfilesId }, { $set: ProfilesDto });
              return { status: true, message: IProfileMessage.updateSuccess };
            } catch (error) {
              if (error.code && error.code == 11000) {
                let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
                let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
                throw new HttpException(DuplicateArrayToString + ' Aleary Exist', HttpStatus.CONFLICT);
              } else {
                 throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
              }
            }
          }

          async deleteModule(ProfilesId: string): Promise<IModuleRes> {
            try {
              await this.Module.deleteOne({ _id: ProfilesId });
              return { status: true, message: IProfileMessage.deleteSuccess };
            } catch (error) {
               throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }

          async findOneModule(ProfilesId: string): Promise<ProfilefindOneByIdRes> {
            try {
              let result = await this.Module.findOne({ _id: ProfilesId });
              if (result) {
                return { status: true, message: IProfileMessage.foundSuccess, data: result };
              } else {
                return { status: false, message: IProfileMessage.notFound, data: null };
              }
            } catch (error) {
               throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
            }
          }
    }