import { IsEmail, IsNotEmpty, Length, ArrayMinSize, IsOptional, ArrayMaxSize } from "class-validator";
import { IModuleRes } from "../../common.service";

export class GiverDetailsDto {
     @IsNotEmpty()
     @Length(1, 20)
     companyName: string;
     @IsEmail()
     email: string;
     status: boolean;
     companyTagLine: string;
     coverImage: string;
     logo: string;
     @IsNotEmpty()
     phoneNo: string;
     @IsNotEmpty()
     address1: string;
     address2: string;
     @IsNotEmpty()
     landmark: string;
     tradeLicence: string;
     tradeLicenceExpDate: Date;
     location: Ilocation;
     images: Iimage[];
     accountDetails: Iaccount;
     invoiceDetails: Iinvoice;
     KeyWord: IKeyWord;
     createdAt?: Date;
     skillSet: string[];
     social: ISocialMedia[];
     about: string;
}



export class GiverDetailsUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    companyName?: string;
    @IsOptional()
    @IsEmail()
    email?: string;
    status?: boolean;
    companyTagLine: string;
    coverImage: string;
    logo: string;
    @IsOptional()
    @IsNotEmpty()
    phoneNo?: string;
    @IsOptional()
    @IsNotEmpty()
    address1?: string;
    address2?: string;
    landmark?: string;
    tradeLicence?: string;
    tradeLicenceExpDate?: Date;
    location: Ilocation;
    @IsOptional()
    images?: Iimage[];
    accountDetails?: Iaccount;
    invoiceDetails?: Iinvoice;
    KeyWord: IKeyWord;
    createdAt?: Date;
    skillSet: string[];
    social: ISocialMedia[];
    about: string;
}

class Ilocation {
     type: string;
     @IsOptional()
     @ArrayMaxSize(2)
     coordinates: number[]
 }

class Iimage {
     thumbnail: string;
     orginal: string;
};

class Iaccount {
     accountNumber: string;
     AccountName: string;
};

class Iinvoice {
     invoiceNumber: number;
     invoicePrefix: string;
     TrnNumber: string;
};

class IKeyWord {
     @IsOptional()
    @ArrayMinSize(1)
     keyWords: string[];
     @IsOptional()
     @IsNotEmpty()
     description: string;
}

class ISocialMedia {
     socialMedia: string;
     link: string;
 }


export enum IGiverDetailsMessage {
    createdSuccess = "GiverDetails Created Successfully",
    updateSuccess = "GiverDetails Details Update Successfully",
    deleteSuccess = "GiverDetails Details Deleted Successfully",
    foundSuccess = "GiverDetails Found Successully",
    notFound = "GiverDetails Not Found"
}


export class GiverDetailsfindOneByIdRes extends IModuleRes {
     data: GiverDetailsDto;
}