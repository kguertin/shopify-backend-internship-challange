const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imagePath: {
        required: true,
        type: String
    },
    imageSize: {
        required: true,
        type: Number
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);