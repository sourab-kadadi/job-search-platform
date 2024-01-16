import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IModuleRes } from '../../common.service';
import { IGiverDetailsMessage, GiverDetailsDto, GiverDetailsUpdateDto, GiverDetailsfindOneByIdRes } from './giver-details.dto';
import { GiverDetail } from './giver-details.interface';

@Injectable()
export class GiverDetailsService {
  constructor(@InjectModel('GiverDetails') private readonly Module: Model<GiverDetail>) {}

  async createModule(GiverDetailsDto: GiverDetailsDto): Promise<IModuleRes> {
    try {
      const createUser = new this.Module(GiverDetailsDto);
      await createUser.save();
      return { status: true, message: IGiverDetailsMessage.createdSuccess };
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(`${DuplicateArrayToString} Aleary Exist`, HttpStatus.CONFLICT);
      } else {
         throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateModule(GiverDetailsId: string, GiverDetailsDto: GiverDetailsUpdateDto): Promise<IModuleRes> {
    try {
      let result = await this.Module.updateOne({ _id: GiverDetailsId }, { $set: GiverDetailsDto });
      return { status: true, message: IGiverDetailsMessage.updateSuccess };
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

  async deleteModule(GiverDetailsId: string): Promise<IModuleRes> {
    try {
      await this.Module.deleteOne({ _id: GiverDetailsId });
      return { status: true, message: IGiverDetailsMessage.deleteSuccess };
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneModule(GiverDetailsId: string): Promise<GiverDetailsfindOneByIdRes> {
    try {
      let result = await this.Module.findOne({ _id: GiverDetailsId });
      if (result) {
        return { status: true, message: IGiverDetailsMessage.foundSuccess, data: result };
      } else {
        return { status: false, message: IGiverDetailsMessage.notFound, data: null };
      }
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
