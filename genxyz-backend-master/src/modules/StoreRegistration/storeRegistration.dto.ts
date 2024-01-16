import { IsEmail, IsNotEmpty, Length, ArrayMinSize, IsOptional, ArrayMaxSize } from "class-validator";
import { IModuleRes } from "../../common.service";

export class StoreRegistrationDto {
     @IsNotEmpty()
     @Length(1, 20)
     name: string;
     @IsEmail()
     email: string;
     @IsNotEmpty()
     phoneNo: string;
     ownerFirstName: string;
     ownerLastName: string;
     createdAt?: Date;
}

export enum IStoreMessage {
    createdSuccess = "Store Created Successfully",
    updateSuccess = "Store Details Update Successfully",
    deleteSuccess = "Store Details Deleted Successfully",
    foundSuccess = "Store Found Successully",
    notFound = "Store Not Found"
}


export class StorefindOneByIdRes extends IModuleRes {
     data: StoreRegistrationDto;
}