import { Document } from 'mongoose';

export interface Category extends Document {
   readonly name: string,
   readonly type: string,
   readonly image: CategoryMedia,
   readonly media: CategoryMedia[],
   readonly status: boolean,
   idProofDetails: IdProofDetails
}

export interface IdProofDetails {
    idName: string,
    total: number,
    requiredNumber: number
}


export interface CategoryMedia {
    readonly thumbnail?: string,
    readonly original: string,
    readonly type: string,
    readonly keyword?: string[]
}