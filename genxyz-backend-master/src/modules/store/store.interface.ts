import { Document } from 'mongoose';

export interface Store extends Document{
    readonly name: string;
    readonly email: string;
    readonly storeId: string;
    readonly status: boolean;
    readonly phoneNo: string;
    readonly address1: string;
    readonly address2: string;
    readonly landmark: string;
    readonly tradeLicence: string;
    readonly tradeLicenceExpDate: Date;
    readonly location: Ilocation;
    readonly storeImages: Iimage[];
    readonly accountDetails: Iaccount;
    readonly invoiceDetails: Iinvoice;
    readonly SEO :ISEO;
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
