import express from "express";
import mongoose from "mongoose";;

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, "name is strictly required"],
        trim: true,
        minLength: [3, "characters should not be less than 3"],
        maxLength : [50, "characters should not exceed 50 characters"]
    },
    email: {
        type: String, 
        require: [true, "email is necessary"],
        trim: true, 
        unique: true, 
        lowercase: true, 
    },
    age: {
        type: Number, 
        min: [18, "minimum age should not be less than 18"],
        max: [120, "please enter a valid age"]
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);
export default User;

