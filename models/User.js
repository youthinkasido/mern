const mongoose = require('mongoose'); // require mongooseDB
const Schema = mongoose.Schema; // use mongoose Schema
const UserSchema = new Schema({
    handle: { // name of the attribute// or should we call it a column?
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema); // 
module.exports = User;