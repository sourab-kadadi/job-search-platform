import { IsNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { IModuleRes } from '../../common.service';
import { Profile } from './profile.interface';


export class AddressDetails {
  address1: string;
  address2: string;
  landmark: string;
  country: string;
  district: string;
  place: string;
  pincode: string;
}

export class WorkDetails {
  noOfExp: number;
  salary: Salary;
  serviceServed: preferedWorkLocation;
  preferedWorkLocation: string[];
  language: string[];
}

export class preferedWorkLocation {
  distence: number;
  unit: string;
}

export class Salary {
  salary: number;
  currency: string;
}

export enum ProfileType {
  CUSTOMER = 'CUSTOMER',
  PARTNER = 'PARTNER',
  AGENT = 'AGENT',
  STORE = 'STORE',
}

export class Image {
  type: string;
  original: string;
}

class Iimage {
  type: string;
  original: string;
};

export class IdProof {
  type: string;
  idNumber: string;
  isValidated: boolean;
  images: Iimage;
}

export class Location {
  type: string;
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  coordinates: number[];
}

export class AccountDetails {
  accountNumber: string;
  AccountName: string;
}

export class Service {
  _id: any;
  name: string;
}

export class ProfileDto {
  userId: any;
  profileImg: Image;
  profileType: ProfileType;
  services: Service;
  idProof?: IdProof[];
  @IsNotEmpty()
  location: Location | [];
  @IsNotEmpty()
  addressDetails: AddressDetails;
  @IsNotEmpty()
  workDetails: WorkDetails;
  accountDetails?: AccountDetails;
  createdAt: Date;
}

export class ProfileUpdateDto extends  ProfileDto {
}

export class ProfilefindOneByIdRes extends IModuleRes {
  data: Profile;
}

