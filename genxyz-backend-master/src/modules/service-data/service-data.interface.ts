import { Document } from 'mongoose';

export interface ServiceData extends Document {
    readonly categoryId: string;
    readonly categoryName: string;
    readonly subCategoryId: string;
    readonly subCategoryName: string;
    readonly name: string;
    readonly status: boolean;
    readonly attribute: KeyValuePair[];
}

interface KeyValuePair {
    readonly key: string;
    readonly fieldType: EFIELDTYPE;
    readonly isRequired: boolean;
    readonly isMultiSelection: boolean;
    readonly list: string[];
}

export enum EFIELDTYPE {
    BUTTON="BUTTON",
    TEXT="TEXT",
    LIST="LIST",
    FILE_UPLOAD="FILE_UPLOAD"
}