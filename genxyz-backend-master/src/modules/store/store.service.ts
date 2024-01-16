import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './store.interface';
import { StoreDto, IStoreMessage, StoreUpdateDto, StorefindOneByIdRes } from './store.dto';
import { IModuleRes } from '../../common.service';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Stores') private readonly Module: Model<Store> ) {}

  async createModule(StoreDto: StoreDto):Promise<IModuleRes> {
    try {
      const createUser = new this.Module(StoreDto);
      await createUser.save();
      return {status: true, message: IStoreMessage.createdSuccess}
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


  async updateModule(storeId: string, StoreDto: StoreUpdateDto): Promise<IModuleRes> {
    try {
      let result = await this.Module.updateOne({_id: storeId}, {$set : StoreDto});
      return {status: true, message: IStoreMessage.updateSuccess}
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

  async deleteModule(storeId: string): Promise<IModuleRes> {
    try {
      await this.Module.deleteOne({_id: storeId});
      return {status: true, message: IStoreMessage.deleteSuccess}
    } catch (error) {
         throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findOneModule(storeId: string): Promise<StorefindOneByIdRes> {
    try {
      let result = await this.Module.findOne({_id: storeId});
      if (result) {
        return {status: true, message: IStoreMessage.foundSuccess, data: result}
      } else {
        return {status: false, message: IStoreMessage.notFound, data: null}
      }
    } catch (error) {
         throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

// need to complete
  //  async findByGeoModule(possition: Array<any>): Promise<any> {

  //  }
}
