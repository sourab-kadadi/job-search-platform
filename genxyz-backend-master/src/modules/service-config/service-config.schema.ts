import * as mongoose from 'mongoose';

var serviceData = new mongoose.Schema({
  keyId: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  values: {
    type: [String],
    required: true,
  },
});
export const ServiceConfig = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  categoryName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  serviceData: {
    type: [serviceData],
  },
});

ServiceConfig.index({ categoryId: 1, subCategoryId: 1, profileId: 1 });

ServiceConfig.on('index', function(error) {
  console.log(error.message);
});
