import * as mongoose from 'mongoose';

export const catalog = new mongoose.Schema ({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    crop: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    antherCulture: {
        type: String,
        trim: true,
    },
    silkColour: {
        type: String,
        trim: true,
    },
    cobCharacter: {
        type: String,
        trim: true,
    },
    hnsNumber: {
        type: String,
        trim: true,
    },
    price: {
        type: String,
        trim: true,
        required: true
    },
    unit: {
        type: String,
        default: "kg"
    },
    createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now
    }
},  { timestamps: true });

catalog.index({sku: 1});


catalog.on('index', function(error) {
    console.log(error.message);
  });