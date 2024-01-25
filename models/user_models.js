const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number, 
        default: "090343232212"
    }
})

module.exports = mongoose.model('User', userSchema)