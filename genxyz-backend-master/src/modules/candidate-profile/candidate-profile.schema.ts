import * as mongoose from 'mongoose';
const skills = {
    skillId: {
        type: String
    },
    name: {
        type: String
    }
}
const totalExp = {
    month: {
        type: String,
        required: true,
        trim: true
       },
    year: {
    type: String,
    required: true,
    trim: true
    },
}

const salary = {
    amount: {
        type: Number,
        required: true,
        trim: true
       },
    currency: {
    type: String,
    required: true,
    trim: true,
    default: "INR"
    },
}

const profassionalDetails = {
    totalExp: {
        type: totalExp,
        trim: true
       },
       industry: {
        type: String,
        trim: true
       },
       salary: {
        type: salary
       },
}

const personalDetails = {
    nationality: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        trim: true
    },
    maritalStatus: {
        type: String,
        enum: ['Single','Married', 'Divorced', 'Widow(er)', 'Other'],
        trim: true
    },
    drivingLicense: {
        type: Boolean,
    },
    dob: {
        type: Date
    },
    currentLocation: {
        type: String
    },
    language: {
        type: [String]
    }
}

const fileObj  =  {
    name: {
        type: String,
        trim: true
    },
    fileName: {
        type: String,
    },
    filePath: {
        type: String,
        trim: true
    },
    fileType: {
        type: String,
        trim: true
    },

}

export const  candidateProfile = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        },
    keySkills: {
        type: [skills],
        default: undefined
    },
    professionalDetails: {
        type: profassionalDetails
    },
    personalDetails: {
        type: personalDetails
    },
    cv: {
        type: fileObj
    },
    profileImg: {
        type: fileObj
    },
    createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now,
      },
},  { timestamps: true },
{ strict: true });

candidateProfile.index({userId: 1}, {unique: true});
mongoose.model("candidateprofiles", candidateProfile);
