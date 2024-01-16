import { IsNotEmpty } from "class-validator";
import { IModuleRes } from "../../common.service";

export class UserServiceDto {
    @IsNotEmpty()
    categoryId: string;
    @IsNotEmpty()
    categoryName: string;
    @IsNotEmpty()
    subCategoryId: string;
    @IsNotEmpty()
    subCategoryName: string;
    profileId: any;
    @IsNotEmpty()
    status: boolean;
}

export enum IUserServiceMessage {
    createdSuccess = "Sub Data Created Successfully",
    updateSuccess = "Sub Data Details Update Successfully",
    deleteSuccess = "Sub Data Details Deleted Successfully",
    foundSuccess = "Sub Data Found Successully",
    notFound = "Sub Data Not Found"
}

export class IUserServicefindOneByIdRes extends IModuleRes {
    data: UserServiceDto;
}

export class IUserServicefindManyRes extends IModuleRes  {
    data: UserServiceDto[];
    totalCount: number;
}

export class IUserServiceTextManyRes extends IModuleRes {
    data: UserServiceDto[];
}