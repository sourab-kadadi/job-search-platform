import { IsNotEmpty, Length, ArrayMinSize, IsBoolean, IsOptional } from "class-validator";
import { IModuleRes } from "../../common.service";


export class IdProofDetails {
    idName: string;
    total: number;
    requiredNumber: number;
}
export class CategoryCreateDto {
    _id?: any;
    @IsNotEmpty()
    @Length(1, 20)
     name: string;
     @IsNotEmpty()
     @Length(1, 20)
     type: string;
    //  @ArrayMinSize(1)
     media: CategoryMedia[];
     @IsBoolean()
     status: boolean;
     image: CategoryMedia;
     @ArrayMinSize(1)
     idProofDetails: IdProofDetails;
 }
 export class CategoryUpdateDto {
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    name: string;
    @IsOptional()
    @IsNotEmpty()
    @Length(1, 20)
    type: string;
    @IsOptional()
    @ArrayMinSize(1)
    media: CategoryMedia[];
    @IsOptional()
    @IsBoolean()
    status: boolean;
    image: CategoryMedia;
    @ArrayMinSize(1)
    idProofDetails: IdProofDetails;
}

 export class CategoryMedia {
      thumbnail?: string;
      original: string;
      type: string;
      keyword?: string[]
 }

 export enum ICategoryMessage {
    createdSuccess = "Category Created Successfully",
    updateSuccess = "Category Details Update Successfully",
    deleteSuccess = "Category Details Deleted Successfully",
    foundSuccess = "Category Found Successully",
    notFound = "Category Not Found"
}

export class ICategoryfindOneByIdRes extends IModuleRes {
    data: CategoryCreateDto;
}

export class ICategoryfindManyRes extends IModuleRes  {
    data: CategoryCreateDto[];
    totalCount: number;
}

export class ICategoryTextManyRes extends IModuleRes {
    data: CategoryCreateDto[];
}

export class ICategoryDropDownRes extends IModuleRes {
    data: CategoryCreateDto[];
}