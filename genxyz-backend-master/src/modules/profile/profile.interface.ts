import { Document } from 'mongoose';

export interface Profile extends Document {
    readonly userId: Document;
    readonly profileImg: Image;
    readonly profileType: ProfileType;
    readonly idProofVerfied: IdProof[];
    readonly status: boolean;
    readonly location: Location;
    readonly addressDetails: AddressDetails;
    readonly workDetails: WorkDetails;
    readonly accountDetails: AccountDetails;
    readonly services: service[];
    readonly createdAt: Date;
}``


export interface service extends Document{
    name: string;
}
export interface AddressDetails {
    readonly address1: string;
    readonly address2: string;
    readonly landmark: string;
    readonly country: string;
    readonly district: string;
    readonly place: string;
    readonly pincode: string;
}

export interface WorkDetails {
    noOfExp: number;
    salary: Salary;
    serviceServed: preferedWorkLocation;
    preferedWorkLocation: string[];
    language: string[];
}

export interface preferedWorkLocation {
    distence: number;
    unit: string;
}


export interface Salary {
    salary: number;
    currency: string;
}


export enum ProfileType {
    CUSTOMER="CUSTOMER",
    PARTNER="PARTNER",
    AGENT="AGENT",
    STORE="STORE"
}

export interface Image {
    readonly type: string;
    readonly original: string;
}

export interface IdProof {
    readonly type: string;
    readonly idNumber: string;
    readonly isValidated: boolean;
    readonly image: Image;
}

export interface Location {
    readonly type: string;
    readonly coordinates: number[];
}

export interface AccountDetails {
    readonly accountNumber: string;
    readonly AccountName: string;
}


export enum IProfileMessage {
    createdSuccess = "GiverDetails Created Successfully",
    updateSuccess = "GiverDetails Details Update Successfully",
    deleteSuccess = "GiverDetails Details Deleted Successfully",
    foundSuccess = "GiverDetails Found Successully",
    notFound = "GiverDetails Not Found"
}