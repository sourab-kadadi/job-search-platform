import { EFIELDTYPE } from "./service-data.interface";
import { IsNotEmpty } from "class-validator";
import { IModuleRes } from "../../common.service";

class KeyValuePair {
    key: string;
    fieldType: EFIELDTYPE;
    isRequired: boolean;
    isMultiSelection: boolean;
    list: string[];
}

export class ServiceDataDto {
     @IsNotEmpty()
     categoryId: string;
     @IsNotEmpty()
     categoryName: string;
     @IsNotEmpty()
     subCategoryId: string;
     @IsNotEmpty()
     subCategoryName: string;
     @IsNotEmpty()
     name: string;
     status: boolean;
     attribute: KeyValuePair[];
}

export enum IServiceDataMessage {
    createdSuccess = "Sub Data Created Successfully",
    updateSuccess = "Sub Data Details Update Successfully",
    deleteSuccess = "Sub Data Details Deleted Successfully",
    foundSuccess = "Sub Data Found Successully",
    notFound = "Sub Data Not Found"
}

export class IServiceDatafindOneByIdRes extends IModuleRes {
    data: ServiceDataDto;
}

export class IServiceDatafindManyRes extends IModuleRes  {
    data: ServiceDataDto[];
    totalCount: number;
}

export class IServiceDataTextManyRes extends IModuleRes {
    data: ServiceDataDto[];
}