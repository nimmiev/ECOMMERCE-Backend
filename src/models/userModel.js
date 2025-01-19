const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            minLength: 2,
            maxLength: 100,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            minLength: 10,
            maxLength: 15,
        },
        password: {
            type: String,
            minLength: 8,
            required: true
        }
    })

const UserModels = mongoose.model('user', UserSchema)   

module.exports = UserModels