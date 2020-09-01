const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    images: [{
        imageID: {
            type: Schema.Types.ObjectId,
            ref: "Image",
            required: true
        }
    }]
});

module.exports = mongoose.model('User', userSchema);