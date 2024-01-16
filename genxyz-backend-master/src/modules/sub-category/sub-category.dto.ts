import { IsNotEmpty, Length, ArrayMinSize, IsBoolean, IsOptional } from "class-validator";
import { IModuleRes } from "../../common.service";
import { EFieldType } from "./sub-category.interface";

export class KeyValConfig {
    readonly key: string;
    readonly fieldType: EFieldType;
    readonly isRequired: boolean;
    readonly isMultiSelection: boolean;
    readonly list: string[];
    readonly getDataId: any;
}

export class SubCategoryCreateDto {
    _id?: any;
    @IsNotEmpty()
     categoryId: string;
    @IsNotEmpty()
    @Length(1, 20)
     name: string;
     @IsNotEmpty()
     @Length(1, 20)
     type: string;
    //  @ArrayMinSize(1)
     media: SubCategoryMedia[];
     @IsBoolean()
     status: boolean;
     image: SubCategoryMedia;
     keyValConfig?: KeyValConfig;
 }

 export class SubCategoryUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    name: string;
    @IsOptional()
    @IsNotEmpty()
    categoryId: string;
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    type: string;
    @IsOptional()
    @ArrayMinSize(1)
    media: SubCategoryMedia[];
    @IsOptional()
    @IsBoolean()
    status: boolean;
    image: SubCategoryMedia;
    keyValConfig?: KeyValConfig;
}

 export class SubCategoryMedia {
      thumbnail?: string;
      original: string;
      type: string;
      keyword?: string[]
 }

 export enum ISubCategoryMessage {
    createdSuccess = "Sub Category Created Successfully",
    updateSuccess = "Sub Category Details Update Successfully",
    deleteSuccess = "Sub Category Details Deleted Successfully",
    foundSuccess = "Sub Category Found Successully",
    notFound = "Sub Category Not Found"
}

export class ISubCategoryfindOneByIdRes extends IModuleRes {
    data: SubCategoryCreateDto;
}

export class ISubCategoryfindManyRes extends IModuleRes  {
    data: SubCategoryCreateDto[];
    totalCount: number;
}

export class ISubCategoryTextManyRes extends IModuleRes {
    data: SubCategoryCreateDto[];
}