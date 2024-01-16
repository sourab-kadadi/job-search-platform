import { Document } from 'mongoose';

export interface SubCategory extends Document {
   readonly name: string,
   readonly type: string,
   readonly image: SubCategoryMedia,
   readonly media: SubCategoryMedia[],
   readonly status: boolean,
   readonly categoryId: any,
   readonly keyValConfig: keyValConfig
}


export interface SubCategoryMedia {
    readonly thumbnail?: string,
    readonly original: string,
    readonly type: string,
    readonly keyword?: string[]
}

export interface keyValConfig {
    readonly key: string;
    readonly fieldType: EFieldType,
    readonly isRequired: boolean,
    readonly isMultiSelection: boolean,
    readonly list: string[],
    readonly getDataId: any
}

export enum EFieldType {
    text="text",
    button="button",
    select="select",
    checkbox="checkbox",
    radio="radio"
}