import * as mongoose from 'mongoose';
var images = new mongoose.Schema({ thumbnail: String, orginal: String });
var account = new mongoose.Schema({ accountNumber: String, AccountName: String });
var invoice = new mongoose.Schema({ invoiceNumber: Number, invoicePrefix: String, TrnNumber: String });
var SEO = new mongoose.Schema({ keyWords: { type: [String]}, description: String});
const location = new mongoose.Schema({
    type: { type: String, default: 'Point'},
    coordinates: { type: [Number], index: '2dsphere'}
});
// var timing = new mongoose.Schema({ start: Number, end: String, holiday: {type: String, enum: ['Open', "Close"]} });



export const store = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },
    email: {
         type: String,
         required: true,
         trim: true
        },
    storeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
    status: {
        type: Boolean,
        required: true,
        default: true
        },
    phoneNo: {
        type: String,
        required: true,
       },
    address1: {
        type: String,
        required: true,
        trim: true
        },
    address2: {
        type: String,
        required: true,
        trim: true
        },
    landmark: {
        type: String,
        required: true,
        trim: true
        },
    tradeLicence: {
        type: String,
        required: true,
        trim: true
        },
    tradeLicenceExpDate: {
        type: Date,
        required: true,
        },
    location: {
        type: location
        },
    storeImages: {
        type: [images],
        default: undefined
        },
    accountDetails: {
        type: account,
        default: undefined
        },
    invoiceDetails :  {
        type: invoice,
        default: undefined
        },
    createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now
    },
    SEO : {
        type: SEO
    },
},  { timestamps: true });

store.index({name: 1, storeId: 1});


store.on('index', function(error) {
    console.log(error.message);
  });