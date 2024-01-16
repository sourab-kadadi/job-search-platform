import * as mongoose from 'mongoose';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IModuleRes } from '../../common.service';
import { JobPostDto, IJobPostMessage, JobPostUpdateDto, JobPostfindOneByIdRes, IJobPostfindManyRes } from './job-post.dto';
import { JobPost } from './job-post.interface';
import { UtilsService } from '../../service/utils/utils.service';
import { AwsService } from '../aws/aws.service';
import { uuid } from 'uuidv4';

@Injectable()
export class JobPostService {
  constructor(@InjectModel('JobPosts') private readonly Module: Model<JobPost>, private utilsService: UtilsService, private awsService: AwsService) {}

  async createModule(JobPostDto: JobPostDto): Promise<IModuleRes> {
    try {
      const createUser = new this.Module(JobPostDto);
      await createUser.save();
      return { status: true, message: IJobPostMessage.createdSuccess };
    } catch (error) {
      console.log(error);
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(DuplicateArrayToString + ' Aleary Exist', HttpStatus.CONFLICT);
      } else {
        throw error;
      }
    }
  }

  async updateModule(JobPostId: string, JobPostDto: JobPostUpdateDto): Promise<IModuleRes> {
    try {
      let result = await this.Module.updateOne({ _id: JobPostId }, { $set: JobPostDto });
      return { status: true, message: IJobPostMessage.updateSuccess };
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

  async deleteModule(JobPostId: string): Promise<IModuleRes> {
    try {
      await this.Module.deleteOne({ _id: JobPostId });
      return { status: true, message: IJobPostMessage.deleteSuccess };
    } catch (error) {
      throw new HttpException('Something went wrong. Please try after sometime', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneModule(JobPostId: string): Promise<JobPostfindOneByIdRes> {
    let result = await this.Module.findOne({ _id: JobPostId }).populate('giverId', 'companyDetails.companyName');
    if (result) {
      return { status: true, message: IJobPostMessage.foundSuccess, data: result };
    } else {
      return { status: false, message: IJobPostMessage.notFound, data: null };
    }
  }



  async findOneModuleAndTotalApplication(JobPostId: string, project: any, candidateId: string): Promise<JobPostfindOneByIdRes> {
    console.log("CANDIA", candidateId);
    try {
    let result = await this.Module.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(JobPostId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'giverId',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      { $unwind: '$companyDetails' },
      {
        $lookup: {
          from: 'jobapplies',
          pipeline: [{
            $match: {candidateUserId: mongoose.Types.ObjectId(candidateId), jobPostId: mongoose.Types.ObjectId(JobPostId)}
          }],
          as: 'jobApplied',
        },
      },
      {
        $project: {
          companyName: '$companyDetails.companyDetails.companyName',
          giverId: '$companyDetails._id',
          application: { $size: '$jobApplied' },
          ...project,
        },
      }
    ]
      );
    if (result && result.length) {
      return { status: true, message: IJobPostMessage.foundSuccess, data: result[0] };
    } else {
      throw new NotFoundException(IJobPostMessage.notFound);
    }
  } catch(error) {
    console.log(error);
    
  } 
  }

  async findManyModule(
    page: number,
    count: number,
    search: string,
    project: any,
    giverId?: string,
  ): Promise<IJobPostfindManyRes> {
    try {
      count = Number(count || 0);
      page = Number(page || 0);
      let totalCount: any[] = [{ $count: 'count' }];
      let item: any[] = [
        { $sort: { _id: -1 } },
        { $skip: page * count },
        { $limit: count },
        {
          $lookup: {
            from: 'users',
            localField: 'giverId',
            foreignField: '_id',
            as: 'companyDetails',
          },
        },
        { $unwind: '$companyDetails' },
        {
          $lookup: {
            from: 'jobapplies',
            localField: '_id',
            foreignField: 'jobPostId',
            as: 'jobApplied',
          },
        },
        {
          $project: {
            actualCompanyName: '$companyDetails.companyDetails.companyName',
            application: { $size: '$jobApplied' },
            ...project,
          },
        },
      ];
      let match: any = {};
      if (giverId && giverId != '') {
        match['giverId'] = mongoose.Types.ObjectId(giverId);
      }
      console.log(search);
      if (search && search != '') {
         let searchMatch: any[] = [
          {
            jobTitle: { $regex: new RegExp(search, 'i') },
          },
          {
            'keyWord.name': { $regex: new RegExp(search, 'i') },
          },
        ];
        if (!giverId) {
          searchMatch.push({
            companyName: { $regex: new RegExp(search, 'i') },
          });
        }
        match['$or'] = searchMatch;
      }
      if (match) {
        item.unshift({ $match: match });
        totalCount.unshift({ $match: match });
      }
      console.log(JSON.stringify(totalCount));
      let result = await this.Module.aggregate([
        {
          $facet: {
            item: item,
            totalCount: totalCount,
          },
        },
      ]);
      if (result.length && result[0].totalCount.length) {
        return {
          status: true,
          message: IJobPostMessage.foundSuccess,
          data: result[0].item,
          totalCount: result[0].totalCount[0].count,
        };
      } else {
        throw new NotFoundException(IJobPostMessage.notFound);
      }
    } catch (error) {
      throw error;
    }
  }

  async findManyTextModule(search: string, page: number, count: number, project: any): Promise<IJobPostfindManyRes> {
    try {
      count = Number(count || 0);
      page = Number(page || 0);
      let result = await this.Module.aggregate([
        {
          $facet: {
            item: [
              { $match: { $text: { $search: search } } },
              { $sort: { _id: -1 } },
              { $skip: page * count },
              { $limit: count },
              {
                $lookup: {
                  from: 'users',
                  localField: 'giverId',
                  foreignField: '_id',
                  as: 'companyDetails',
                },
              },
              { $unwind: '$companyDetails' },
              { $project: { actualCompanyName: '$companyDetails.companyDetails.companyName', ...project } },
            ],
            totalCount: [{ $count: 'count' }],
          },
        },
      ]);
      if (result.length && result[0].totalCount.length) {
        return {
          status: true,
          message: IJobPostMessage.foundSuccess,
          data: result[0].item,
          totalCount: result[0].totalCount[0].count,
        };
      } else {
        console.log("Erroro");
        throw new NotFoundException();
      }
    } catch (error) {
      throw error;
    }
  }


  async uplaodUrlToFile() {
    try {
      let getJobsOfLogoUrl = await this.Module.find({upload: "url"});
      // console.log(getJobsOfLogoUrl);
      // let fileUplaod = await (await this.utilsService.getDataFromUrl("https://we-work-remotely.imgix.net/logos/0066/9230/logo.gif?ixlib=rails-4.0.0&w=50&h=50&dpr=2&fit=fill&auto=compress")).toPromise();
      // console.log(typeof fileUplaod.data);
      // let udid = uuid();
      // let file:any = {
      //   content: fileUplaod.data,
      //   fileName: "sam",
      //   contentType: fileUplaod.headers["content-type"],
      //   ACL: 'public-read',
      // }
      // let awsUpload = await this.awsService.fileUploadS3(file);
      for(let job of getJobsOfLogoUrl) {
        console.log(job.logo);
      let fileUplaod = await (await this.utilsService.getDataFromUrl(job.logo)).toPromise();
      console.log(fileUplaod.data);
      let udid = uuid();
      let file:any = {
        content: fileUplaod.data,
        fileName: "logo/" + udid,
        contentType: fileUplaod.headers["content-type"],
        ACL: 'public-read',
      }
      let awsUpload = await this.awsService.fileUploadS3(file);
      await this.Module.updateOne({_id: job._id}, {$set: {logo: awsUpload.key, upload: "s3"}});
      console.log(awsUpload);
    }
    } catch (error) {
      console.log(error);
    }
  }
}
