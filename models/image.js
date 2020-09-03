const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imagePath: {
        required: true,
        type: String
    },
    status: {
        type: String,
        default: 'private'
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);