import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "name must be given"],
        trim: true
    },
    email: {
        type: String, 
        required: [true, "email is necessary"],
        unique: true, 
        lowercase: true,
    },
    age: {
        type: Number, 
        required: [true, "age is mandatory"]
    }
}, {timestamps: true})

// pre-ave hook to capitalize the first letter
userSchema.pre('save', function(){
    console.log(`pre-save hook is working to formate your string: ${this.name}`);

    if(this.name){
        this.name = this.name
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
    }
})

const User = mongoose.model("User", userSchema);
export default User;
