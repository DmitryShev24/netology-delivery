const {Schema, model, ObjectId} = require('mongoose');

const messageSchema = new Schema({
    id: {
        type: ObjectId,
        default: "",
        required: true,
        unique: true
    },
    author: {
        type: ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    readAt: {
        type: Date,
    },


});

module.exports = model('Message', messageSchema);