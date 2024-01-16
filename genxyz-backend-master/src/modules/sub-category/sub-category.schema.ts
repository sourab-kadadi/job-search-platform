import * as mongoose from 'mongoose';
var media = new mongoose.Schema({ thumbnail: String, original: {
    type: String,
    required: true,
}, type: {
    type: String,
    required: true,
}, keyword: [String] });

var keyValConfig = new mongoose.Schema({
    key: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      required: true,
      enum: ['text', 'button', 'select', 'checkbox', 'radio']
    },
    isRequired: {
      boolean: Boolean,
      default: false,
    },
    isMultiSelection: {
      type: Boolean,
    },
    list: {
      type: [String],
    },
    getDataId: {
        type: mongoose.Schema.Types.ObjectId
    }
  });

export const subCategory = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: media,
        required: true,
        },
    media: {
        type: [media],
        default: undefined
        },
    status: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    keyValConfig: {
        type: [keyValConfig],
  },
 },{ timestamps: true });

 subCategory.index({name: 1, categoryId: 1}, {unique: true});
 subCategory.index({name: 'text'});



 subCategory.on('index', function(error) {
    console.log(error.message);
  });