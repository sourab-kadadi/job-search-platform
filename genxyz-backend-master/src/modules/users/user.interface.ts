import { Document } from 'mongoose';

export interface User extends Document {
   readonly firstName: string,
   readonly lastName: string,
   readonly psw: string,
   readonly email: string,
   readonly phoneNo: string,
   readonly status: boolean,
   readonly createdAt: Date,
   readonly lastActiveDate: Date,
   readonly gender: Gender,
   readonly userType: UserType
   readonly companyDetails?: CompanyDetails
   readonly ExpType?: ExpType
}

export interface CompanyDetails {
   companyName: string;
   logo: string;
}

export enum Gender  {
   MALE='MALE',
   FEMALE='FEMALE',
   OTHER='OTHER'
}

export enum ExpType  {
   FRESHERS='FRESHER ',
   EXPERIENCED='EXPERIENCED'
}

export enum UserType {
   CUSTOMER='CUSTOMER',
   PARTNER='PARTNER',
   AGENT='AGENT',
   CANDIDATE='CANDIDATE',
   COMPANY='COMPANY'
}