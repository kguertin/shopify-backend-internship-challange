const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        tpye: String
    }
});

module.exports = mongoose.model('User', userSchema);