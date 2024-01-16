import * as mongoose from 'mongoose';

var keyValuePair = {
  key: {
    type: String,
    required: true,
  },
  values: {
    type: [String],
    required: true,
  },
}

export const ServiceData = new mongoose.Schema({
  categoryId: {
    type: String,
    required: true
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
  name: {
    type: String,
    required: true,
  },
  attribute: {
    type: [keyValuePair],
  },
});

ServiceData.index({ name: 1 });

ServiceData.on('index', function(error) {
  console.log(error.message);
});
