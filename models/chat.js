const {Schema, model, ObjectId} = require('mongoose');

const chatSchema = new Schema({
    id: {
        type: ObjectId,
        default: "",
        required: true,
        unique: true
    },
    users: {
        type: [ObjectId, ObjectId],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    messages: {
        type: [String],
        // тут должен быть массив Message
    },


});

module.exports = model('Chat', chatSchema);