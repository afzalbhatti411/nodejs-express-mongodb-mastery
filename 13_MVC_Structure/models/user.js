import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number, required: true}

},{Timestamp: true})

const User = mongoose.model('user', userSchema);
export default User;

