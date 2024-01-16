import * as mongoose from 'mongoose';
var workExp = { min: Number, max: Number };
var currency = { name: Number, symbol: String };
var ctc = { min: Number, max: Number, currency: currency };
var location = {
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
};
var keyWords = { name: String };
export const jobPost = new mongoose.Schema(
  {
    giverId: {
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
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    giverType: {
      type: String,
      required: true,
      enum: ['COMPANY', 'INDIVIDUAL'],
      default: 'COMPANY',
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    vacancies: {
      type: Number,
      required: true,
      trim: true,
    },
    keyWord: {
      type: [keyWords],
      default: undefined,
    },
    workExp: {
      type: workExp,
      default: undefined,
    },
    ctc: {
      type: ctc,
      default: undefined,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: location,
      required: true,
    },
    funcArea: {
      type: String,
      trim: true,
    },
    upload: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      setDefaultsOnInsert: true,
      default: Date.now,
    },
  },
  { timestamps: true },
);

jobPost.index({ giverId: 1, jobTitle: 1 });
jobPost.index({ jobTitle: 1, "keyWord.name": 1, companyName: 1 });

jobPost.on('index', function(error) {
  console.log(error.message);
});

mongoose.model("jobposts", jobPost);
