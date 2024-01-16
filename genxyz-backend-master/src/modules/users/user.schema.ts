import * as mongoose from 'mongoose';


export const companyDetails = {
    companyName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
}

export const user = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true
       },
    lastName: String,
    psw: {
        type: String,
        required: true,
       },
    email: {
         type: String,
         required: true,
         unique: true
        },
    phoneNo: {
        type: String,
        required: true,
        unique: true
       },
    userType: {
        type: String,
        enum: ['CUSTOMER', 'PARTNER', 'AGENT', 'CANDIDATE', 'COMPANY'],
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['MALE', 'FEMALE', 'OTHER']
    },
    expType:  {
        type: String,
        enum: ['FRESHER', 'EXPERIENCED']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
       createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now
    },
    lastActiveDate: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now
    },
    companyDetails: {
        type: companyDetails
    }
},{ timestamps: true })

user.index({email: 1})
mongoose.model("users", user);
user.on('index', function(error) {
    console.log(error.message);
  });
