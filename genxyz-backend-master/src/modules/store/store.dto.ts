import { IsEmail, IsNotEmpty, Length, ArrayMinSize, IsOptional, ArrayMaxSize } from "class-validator";
import { IModuleRes } from "../../common.service";

export class StoreDto {
     @IsNotEmpty()
     @Length(1, 20)
     name: string;
     @IsEmail()
     email: string;
     storeId: string;
     status: boolean;
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
     @ArrayMinSize(1)
     storeImages: Iimage[];
     accountDetails: Iaccount;
     invoiceDetails: Iinvoice;
     SEO: ISEO;
     createdAt?: Date;
}


export class StoreUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    name?: string;
    @IsOptional()
    @IsEmail()
    email?: string;
    storeId?: string;
    status?: boolean;
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
    @ArrayMinSize(1)
    storeImages?: Iimage[];
    accountDetails?: Iaccount;
    invoiceDetails?: Iinvoice;
    SEO?: ISEO;
    createdAt?: Date;
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
     invoiceNumber: string;
     invoicePrefix: string;
     TrnNumber: string;
};

class ISEO {
     @IsOptional()
    @ArrayMinSize(1)
     keyWords: string[];
     @IsOptional()
     @IsNotEmpty()
     description: string;
}

export enum IStoreMessage {
    createdSuccess = "Store Created Successfully",
    updateSuccess = "Store Details Update Successfully",
    deleteSuccess = "Store Details Deleted Successfully",
    foundSuccess = "Store Found Successully",
    notFound = "Store Not Found"
}


export class StorefindOneByIdRes extends IModuleRes {
     data: StoreDto;
}