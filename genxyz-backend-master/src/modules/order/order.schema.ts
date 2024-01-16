import * as mongoose from 'mongoose';

export const order = new mongoose.Schema ({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        },
        orderId: {
        type: String,
        required: true
        },
        ordergroupId: {
            type: String,
            required: true
            },
        storeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Stores'
            },
        catalogId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, // need to ref categoryId
            },
        sku: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        vatType: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        note: {
            type: String
        },
        trackingId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            },
        orderType: {
            type: String
        },
        createdAt: {
            type: Date,
            setDefaultsOnInsert: true,
            default: Date.now
        },
 }, { timestamps: true });

 order.index({orderId: 1});


 order.on('index', function(error) {
    console.log(error.message);
  });