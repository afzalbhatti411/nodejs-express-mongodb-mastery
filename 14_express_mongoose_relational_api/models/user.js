import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "name is required"],
    },
    email: {
        type: String, 
        required: [true, "email is necessary"],
        unique: [true, "email is necessary to be unique"]
    },
    age: {
        type: Number, 
        required: [true, "age is necessary"]
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
export default User;
