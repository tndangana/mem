const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password is too short!'],
    },
    mobile: {
        type: Number,
        required: [true, 'What is your contact number?']
    },
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: [4, 'UserName is too short!'],
    },
    dob: {
        type: Date
    },
    account_type: {
        type: String,
        enum: ['SPONSOR', 'MEMBER', 'ADMINISTRATOR', 'FAN']
    },
    isActive: {
        type: Boolean
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('user', UserSchema);