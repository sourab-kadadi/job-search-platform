import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CandidateProfileDto, CandidateProfilefindOneByIdRes, CandidateProfileMessage, CandidateProfileUpdateDto } from './candidate-profile.dto';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { CandidateProfile } from './candidate-profile.interface';

@Injectable()
export class CandidateProfileService {
    constructor(@InjectModel('CandidateProfiles') private readonly Module: Model<CandidateProfile>) {}

    async createModule(CategoryDto: CandidateProfileDto): Promise<IModuleRes> {
      try {
          const createUser = new this.Module(CategoryDto);
          await createUser.save();
          return { message:  CandidateProfileMessage.createdSuccess };
      } catch (error) {
        console.log(error);
        throw error;
      }
      }

      async updateModule(CandidateProfileId: string, CandidateProfileDto: CandidateProfileUpdateDto): Promise<IModuleRes> {
          let update  = await this.Module.updateOne({ userId: CandidateProfileId }, { $set: CandidateProfileDto });
          return { status: true, message: CandidateProfileMessage.updateSuccess };
      }

      async deleteModule(CandidateProfileId: string): Promise<IModuleRes> {
          await this.Module.deleteOne({ _id: CandidateProfileId });
          return { status: true, message: CandidateProfileMessage.deleteSuccess };
      }


      async findOneModule(CandidateProfileId: string): Promise<CandidateProfilefindOneByIdRes> {
          let result = await this.Module.findOne({ userId: CandidateProfileId });
          console.log(result);
          if (!result) {
            throw new HttpException(
              CandidateProfileMessage.notFound,
              HttpStatus.NOT_FOUND,
            );
          }
          return { message: CandidateProfileMessage.foundSuccess, data: result };
      }
}
