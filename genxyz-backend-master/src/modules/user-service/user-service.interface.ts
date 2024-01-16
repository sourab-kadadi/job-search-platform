import { Document } from 'mongoose';

export interface UserService extends Document {
    readonly categoryId: any;
    readonly categoryName: string;
    readonly subCategoryId: any;
    readonly subCategoryName: string;
    readonly profileId: any;
    status: boolean;
}