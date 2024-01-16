import { Document } from 'mongoose';

export interface StoreRegistration extends Document{
    readonly name: string;
    readonly email: string;
    readonly storeId: string;
    readonly status: boolean;
    readonly phoneNo: string;
    readonly ownerFirstName: string;
    readonly ownerLastName: string;
    readonly createdAt: Date;
};

interface Ilocation {
    type: string;
    coordinates: number[]
}

interface Iimage {
    readonly thumbnail: string;
    readonly orginal: string;
};

interface Iaccount {
    readonly accountNumber: string;
    readonly AccountName: string;
};

interface Iinvoice {
    readonly invoiceNumber: string;
    readonly invoicePrefix: string;
    readonly TrnNumber: string;
};

interface ISEO {
    readonly keyWords: string[],
    readonly description: string
}
