const {Schema, model, Types} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({

    email: {
        type: String,
        //required: true,
        //unique: true
    },
    passwordHash: {
        type: String,
        //required: true,
    },
    name: {
        type: String,
        //required: true,
    },
    //contactPhone: String
}, {
    typeKey: '$type'
});

module.exports = model('User', userSchema);