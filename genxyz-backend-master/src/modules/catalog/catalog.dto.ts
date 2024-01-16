import { IsNotEmpty, ArrayMinSize, IsOptional } from "class-validator";
import { IModuleRes } from "../../common.service";
import { Catalog } from "./catalog.interface";

export class CreateCatalogDto {
    @IsNotEmpty()
     name: string;
     @IsNotEmpty()
     crop: string;
     antherCulture: string;  
     silkColour: string; 
     hnsNumber: string; 
     @IsNotEmpty()
     price: number; 
     unit?: string;
     createdAt: string;
}


export class UpdateCatalogDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    crop: string;
    antherCulture: string;  
    silkColour: string; 
    hnsNumber: string; 
    @IsNotEmpty()
    price: number; 
    unit?: string;
    createdAt: string;
}

export class CatalogfindOneByIdRes extends IModuleRes {
    data: Catalog;
}

export class keyValue {
    @IsNotEmpty()
    key: string;
    @IsNotEmpty()
    value: string
}

export enum EItemStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    NOQUANTITY = "NOQUANTITY",
    KILL = "KILL"
}

export enum ICatalogMessage {
    createdSuccess = "Catalog Created Successfully",
    updateSuccess = "Catalog Details Update Successfully",
    deleteSuccess = "Catalog Details Deleted Successfully",
    foundSuccess = "Catalog Found Successully",
    notFound = "Catalog Not Found"
}
export class ICatalogfindManyRes extends IModuleRes  {
    data: CreateCatalogDto[];
    totalCount: number;
}