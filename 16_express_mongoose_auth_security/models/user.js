import { genSalt } from "bcryptjs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "name must be given"],
        trim: true, 
        minLength : [3, "name's minimum characters = 3"],
        maxLength: [50, "name's maximum characters = 50"]
    },
    email: {
        type: String, 
        required : [true, "email is necessary"],
        unique: true,
        trim: true, 
        lowercase: true 
    },
    password: {
        type: String, 
        required: [true, "password is mandatory"],
        minLength: [3, "password minimum lentgh is 3 characters"]
    }
}, {timestamps: true})


// pre-save hook 
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    try{
        console.log(`encryption in progress of password : ${this.password}`)

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(err){
        throw(err)
    }
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
    
}

const User = mongoose.model('user', userSchema);
export default User;

