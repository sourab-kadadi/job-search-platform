import { IsEmail, IsNotEmpty, Length, ArrayMinSize, IsOptional, ArrayMaxSize } from "class-validator";
import { IModuleRes } from "../../common.service";

export class JobPostDto {
    _id?: any;
     giverId: any;
     companyName: string;
     status: boolean;
     giverType: EGiverType;
     @IsNotEmpty({message: "Job Title Should Not be Empty!"})
     @Length(5, 100, {message: "Job Title Should be between 5 to 100 characters"})
     jobTitle: string;
     @IsNotEmpty({message: "Job Description Should Not be Empty!"})
     jobDescription: string;
     @IsNotEmpty({message: "Please enter Number of vacancies"})
     vacancies: number;
    @ArrayMinSize(1, {message: "Please add atleast 1 Keyword, Which helps cadidates to search you job post"})
     keyWord: IkeyWords[];
     workExp: IworkExp;
     ctc: Ictc;
     industry: string;
     funcArea?: string;
     location: Ilocation
 }


 export class JobPostUpdateDto {
    status: boolean;
    @IsNotEmpty({message: "Please fill job title"})
    @Length(5, 100, {message: "Job Title Should be between 5 to 100 characters"})
    jobTitle: string;
    @IsNotEmpty({message: "Please fill job description"})
    jobDescription: string;
    @IsNotEmpty({message: "Please fill vacancies for this job post"})
    vacancies: number;
    @ArrayMinSize(1, {message: "Please add atleast 1 Keyword, Which helps cadidates to search you job post"})
    keyWord: IkeyWords[];
    workExp: IworkExp;
    ctc: Ictc;
    industry: string;
    funcArea?: string;
    location: Ilocation
}


class Ilocation {
    country: string;
    state: string;
    city: string;
  }

 enum EGiverType {
    COMPANY="COMPANY",
    INDIVIDUAL="INDIVIDUAL"
 }

 class IkeyWords {
    name: string;
  }
 class IworkExp {
    min: number;
    max: number;
 }

 class ICurrency {
    name: string;
    symbol: string;
 }

 class Ictc {
    min: number;
    max: number;
    currency: ICurrency;
 }

 export enum IJobPostMessage {
    createdSuccess = "Job Post Created Successfully",
    updateSuccess = "Job Post Details Update Successfully",
    deleteSuccess = "Job Post Details Deleted Successfully",
    foundSuccess = "Job Post Found Successully",
    notFound = "Job Post Not Found"
}


export class JobPostfindOneByIdRes extends IModuleRes {
     data: JobPostDto;
}

export class IJobPostwithId extends JobPostDto {
    _id: any;
}

export class IJobPostfindManyRes extends IModuleRes  {
    data: JobPostDto[];
    totalCount: number;
}

export class IJobPostTextManyRes extends IModuleRes {
    data: JobPostDto[];
}