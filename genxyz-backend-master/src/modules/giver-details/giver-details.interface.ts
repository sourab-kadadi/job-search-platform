import { Document } from 'mongoose';

export interface GiverDetail extends Document{
    readonly companyName: string;
    readonly companyTagLine: string;
    readonly coverImage: string;
    readonly logo: string;
    readonly email: string;
    readonly status: boolean;
    readonly phoneNo: string;
    readonly address1: string;
    readonly address2: string;
    readonly landmark: string;
    readonly tradeLicence: string;
    readonly tradeLicenceExpDate: Date;
    readonly location: Ilocation;
    readonly images: Iimage[];
    readonly accountDetails: Iaccount;
    readonly invoiceDetails: Iinvoice;
    readonly KeyWord : IKeyWord;
    readonly createdAt: Date;
    readonly skillSet: string[];
    readonly social: ISocialMedia[];
    readonly about: string;
};


interface ISocialMedia {
    socialMedia: string;
    link: string;
}

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
    readonly invoiceNumber: number;
    readonly invoicePrefix: string;
    readonly TrnNumber: string;
};

interface IKeyWord {
    readonly keyWords: string[],
    readonly description: string
}
