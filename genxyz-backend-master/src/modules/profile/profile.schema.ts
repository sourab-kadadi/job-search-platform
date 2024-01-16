import * as mongoose from 'mongoose';

const location = new mongoose.Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], require: true, index: '2dsphere' },
});

var images = new mongoose.Schema({ fileType: String, original: { type: String, default: null } });

var services = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: { type: Boolean, default: true },
});

const idproof = {
  type: {
    type: String,
    required: true,
  },
  idNumber: { type: String },
  isValidated: { type: String, default: false },
  images: [images],
};
// const keyValue = new mongoose.Schema({
//   referenceId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true
//   },
//   key: {
//     type: String,
//     required: true,
//   },
//   value: {
//     type: String,
//     required: true,
//   },
//   type: {
//     type: String,
//     required: true,
//   },
// });
const profileimg = { fileType: String, original: { type: String, default: null } };
var serviceServed = { distence: { type: Number }, unit: { type: String } };

var account = {
  accountNumber: String,
  AccountName: String,
};
var addressDetails =  new mongoose.Schema({
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    required: true,
    trim: true,
  },
  landmark: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    trim: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: Number,
    required: true,
    trim: true,
  },
});

var salary = {
  salary: { type: Number },
  currency: { type: String, default: 'INR' },
};

var workDetails = {
  noOfExp: {
    type: Number,
    required: true,
  },
  salary: {
    type: salary,
    required: true,
  },
  serviceServed: {
    type: serviceServed,
    required: true,
    default: undefined,
  },
  preferedWorkLocation: {
    type: [String],
    required: true,
    default: undefined,
  },
  language: {
    type: [String],
    default: undefined,
  },
};

export const Profile = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      trim: true,
    },
    profileType: {
      type: String,
      enum: ['CUSTOMER', 'PARTNER', 'AGENT', 'STORE'],
      required: true,
    },
    idProof: {
      type: [idproof],
      default: undefined,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    location: {
      type: location,
      required: true,
    },
    profileImg: {
      type: profileimg
    },
    addressDetails: {
      type: addressDetails,
      required: true,
    },
    workDetails: {
      type: workDetails,
      required: true,
    },
    accountDetails: {
      type: account,
      default: undefined,
    },
    services: {
      type: [services],
      default: undefined,
    },
    createdAt: {
      type: Date,
      setDefaultsOnInsert: true,
      default: Date.now,
    },
  },
  { timestamps: true },
  { strict: true }
);

Profile.index({ name: 1 });

Profile.on('index', function(error) {
  console.log(error.message);
});
