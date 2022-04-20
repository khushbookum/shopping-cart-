const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match:[/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/]
    },
    profileImage: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8, 
        maxlength:15
    },
    address: {
        shipping: {
            street: {
                type: String,
                required: true,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            pincode: {
                type: Number,
                required: true,
                trim: true
            }
        },
        billing: {
            street: {
                type: String,
                required: true,
                trim: true
            },
            city: {
                type: String,
                required: true,
                trim: true
            },
            pincode: {
                type: Number,
                required: true,
                trim: true
            }
        }
    }
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then((encryptedPassword) => {
        this.password = encryptedPassword;
        next();
    }).catch((error) => {
        throw error;
    });
});

module.exports = mongoose.model('User', userSchema);