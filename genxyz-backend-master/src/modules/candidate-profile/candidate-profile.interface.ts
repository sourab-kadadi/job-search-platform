import { Document } from 'mongoose';

export interface CandidateProfile extends Document {
    readonly userId: any,
    readonly keySkills?: Skills[],
    readonly professionalDetails?: ProfessionalDetails,
    readonly personalDetails?: PersonalDetails,
    readonly cv?: FileObj,
    readonly profileImg?: FileObj
}

export interface Skills {
    skillId?: string;
    name: string;
}

export interface ProfessionalDetails {
    totalExp: TotalExp,
    industry: string,
    salary: Salary
}

export interface TotalExp {
    month: string,
    year: string
}

export interface Salary {
    amount: number,
    currency: string;
}

export interface PersonalDetails {
    nationality: string,
    gender: EGender,
    maritalStatus: EMaritalStatus,
    drivingLicense: boolean,
    dob: Date,
    currentLoaction: string,
    language: string[]
}

export enum EGender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export enum EMaritalStatus {
    Single = "Single",
    Married = "Married",
    Divorced = "Divorced",
    Widow = "Widow(er)",
    Other = "Other"
}

export interface FileObj {
    name: string,
    filePath: string
    fileName: string;
    fileType: string;
}