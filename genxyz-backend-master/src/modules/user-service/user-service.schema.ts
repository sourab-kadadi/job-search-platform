import * as mongoose from 'mongoose';

export const UserService = new mongoose.Schema({
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
      profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
      }
});


UserService.index({ categoryId: 1, subCategoryId: 1,  profileId: 1});

UserService.on('index', function(error) {
  console.log(error.message);
});