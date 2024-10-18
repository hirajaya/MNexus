import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7,
        match: [/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{7}$/, 'Username must be exactly 7 characters long and contain at least 2 digits'],
    },
    name: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Phone number must contain exactly 10 digits'],
    },
    password: {
        type: String,
        required: true,
        minlength: 7, 
        maxlength: 100,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    isSalesM: {
        type: Boolean,
        required: true,
        default: false,
    },
    isInventoryM: {
        type: Boolean,
        required: true,
        default: false,
    },
    isOrderM: {
        type: Boolean,
        required: true,
        default: false,
    }
}, 
{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
