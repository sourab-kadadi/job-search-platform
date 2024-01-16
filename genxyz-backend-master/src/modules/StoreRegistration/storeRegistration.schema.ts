import * as mongoose from 'mongoose';
// var timing = new mongoose.Schema({ start: Number, end: String, holiday: {type: String, enum: ['Open', "Close"]} });



export const store = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
       },
    email: {
         type: String,
         required: true,
         trim: true
        },
    phoneNo: {
        type: String,
        required: true,
       },
    createdAt: {
        type: Date,
        setDefaultsOnInsert: true,
        default: Date.now
    },
    ownerFirstName: {
        type: String,
        required: true,
       },
    ownerLastName: {
    type: String,
    required: true,
    },
},  { timestamps: true });

store.index({name: 1, storeId: 1});


store.on('index', function(error) {
    console.log(error.message);
  });