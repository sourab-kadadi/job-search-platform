import { IsOptional } from "class-validator";
import { IModuleRes } from "../../common.service";

export enum EMaritalStatus {
    Single = "Single",
    Married = "Married",
    Divorced = "Divorced",
    Widow = "Widow(er)",
    Other = "Other"
}

export class FileObj {
    name: string;
    filePath: string;
    fileName: string;
    fileType: string;
}

export class ProfessionalDetails {
    totalExp: TotalExp;
    industry: string[];
    salary: Salary;
}

export class TotalExp {
    month: string;
    year: string;
}

export class Salary {
    amount: number;
    currency: string;
}

export class PersonalDetails {
    nationality: string;
    gender: EGender;
    maritalStatus: EMaritalStatus;
    drivingLicense: boolean;
    dob: Date;
    currentLoaction: string;
    language: string[];
}

export enum EGender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export class Skills {
    @IsOptional()
    skillId: string;
    name: string;
}

export class CandidateProfileDto {
    userId: any;
    @IsOptional()
    keySkills: Skills[];
    @IsOptional()
    professionalDetails: ProfessionalDetails;
    @IsOptional()
    personalDetails: PersonalDetails;
    @IsOptional()
    cv: FileObj;
    profileObj: FileObj;
}

export class CandidateProfileUpdateDto {
    @IsOptional()
    keySkills: Skills[];
    @IsOptional()
    professionalDetails: ProfessionalDetails;
    @IsOptional()
    personalDetails: PersonalDetails;
    @IsOptional()
    cv: FileObj;
    profileObj: FileObj;
}



export enum CandidateProfileMessage {
    createdSuccess = "Candidate Created Successfully",
    updateSuccess = "Candidate Details Update Successfully",
    deleteSuccess = "Candidate Details Deleted Successfully",
    foundSuccess = "Candidate Found Successully",
    notFound = "Candidate Not Found"
}

export class CandidateProfilefindOneByIdRes extends IModuleRes {
    data: CandidateProfileDto;
}