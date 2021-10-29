const {Schema, model, ObjectId} = require('mongoose');

const advertisementSchema = new Schema({
    id: {
        type: ObjectId,
        default: "",
        required: true,
        unique: true
    },
    shortText: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    images: {
        type: [String],
    },
    userId: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
    },
    isDeleted: {
        type: Boolean,
        required: true
    },

});

module.exports = model('Advertisement', advertisementSchema);