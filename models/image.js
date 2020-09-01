const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    imagePath: {
        required: true,
        type: String
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);