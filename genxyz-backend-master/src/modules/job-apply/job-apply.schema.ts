import * as mongoose from 'mongoose';


export const jobApply = new mongoose.Schema({
    jobPostId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'jobposts',
      },
    candidateUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'candidateprofiles',
    },
    candidateName: {
        type: String,
        required: true,
        trim: true,
        },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'users',
        },
    companyName: {
        type: String,
        required: true,
        trim: true,
        },
    createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now,
        },
},  { timestamps: true });

jobApply.index({ jobPostId: 1, candidateProfileId: 1 }, {unique: true});

jobApply.on('index', function(error) {
  console.log(error.message);
});
