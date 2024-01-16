import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModuleRes } from 'src/common.service';
import { IJobApplyMessage, JobApplyDto } from './job-apply.dto';
import { JobApply } from './job-apply.interface';

@Injectable()
export class JobApplyService {
    constructor(@InjectModel('JobApply') private readonly Module: Model<JobApply> ) {}

    async createModule(JobApplyDto: JobApplyDto):Promise<IModuleRes> {
        try {
          const createUser = new this.Module(JobApplyDto)
          await createUser.save();
          return {status: true, message: IJobApplyMessage.createdSuccess}
        } catch (error) {
          console.log(error)
          if (error.code && error.code == 11000) {
            let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
            let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
            throw new HttpException(
              "You have already submitted application for this job",
              HttpStatus.CONFLICT,
            );
          } else {
             throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      }
}
