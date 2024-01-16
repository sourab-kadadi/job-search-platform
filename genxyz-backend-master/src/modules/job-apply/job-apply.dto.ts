import { IsNotEmpty } from 'class-validator';

export class JobApplyDto {
  @IsNotEmpty()
  jobPostId: any;
  @IsNotEmpty()
  companyId: any;
  @IsNotEmpty()
  companyName: string;
}


export enum IJobApplyMessage {
    createdSuccess = "Job Applyed Successfully",
    foundSuccess = "Job Application Found Successully",
    notFound = "Job Application Not Found"
}