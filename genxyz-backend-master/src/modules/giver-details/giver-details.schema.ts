import * as mongoose from 'mongoose';
var social = new mongoose.Schema({ socialMedia: String, link: String });
var images = new mongoose.Schema({ thumbnail: String, orginal: String });
var account = new mongoose.Schema({ accountNumber: String, AccountName: String });
var invoice = new mongoose.Schema({ invoiceNumber: Number, invoicePrefix: String, TrnNumber: String });
var KeyWord = new mongoose.Schema({ keyWords: { type: [String]}, description: String});
const location = new mongoose.Schema({
    type: { type: String, default: 'Point'},
    coordinates: { type: [Number], index: '2dsphere'}
});
export const giverDetails = new mongoose.Schema ({
    companyName: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },
    companyTagLine: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
    about: {
        type: String,
        required: true,
        unique: true,
        trim: true
        },
    coverImage: {
        type: String,
        trim: true
        },
    logo: {
        type: String,
        trim: true
        },
    email: {
         type: String,
         required: true,
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
        trim: true
        },
    tradeLicenceExpDate: {
        type: Date,
        },
    location: {
        type: location,
        required: true,
        },
    images: {
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
    KeyWord : {
        type: [KeyWord],
        default: undefined
    },
    skillSet : {
        type: [String],
        default: undefined
    },
    social : {
        type: [social],
        default: undefined
    },
},  { timestamps: true });

giverDetails.index({name: 1});


giverDetails.on('index', function(error) {
    console.log(error.message);
  });