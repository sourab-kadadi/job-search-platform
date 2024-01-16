import { Document } from 'mongoose';

export interface Order extends Document {
    readonly customerId: any;
    readonly orderId: string;
    readonly ordergroupId: string;
    readonly storeId: any;
    readonly categoryId: any;
    readonly sku: string;
    readonly amount: number;
    readonly vatType: string;
    readonly discount: string;
    readonly quantity: string;
    readonly unit: string;
    readonly note: string;
    readonly trackingId: any;
    readonly orderType: string;
    readonly createdAt: Date;
}