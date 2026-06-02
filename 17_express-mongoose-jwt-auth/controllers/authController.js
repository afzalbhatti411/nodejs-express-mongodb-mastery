import User from "../models/user.js";

export const registerUser = async (req, res, next)=>{
    try{
        const {name, email, password} = req.body;

        // Create the new document instance (our pre-save hook will handle the hashing!)
        const newUser = User({name, email, password});
        const savedUser = await newUser.save();

        // Security best practice: Strip the hash string from the JSON response object 
        // so it never wanders back out into the open web network response payload
        savedUser.password = undefined;

        res.status(200).json({
            message: "user account registered successfully",
            user: savedUser    
        })


    }catch(err){
        next(err)
    }
}

export const loginUser = async (req, res, next)=>{
    try{
        const {email, password} = req.body;

        // check if user exist in mongodb
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "invalid email or password credientials"})
        }
        // 2. Use our brand new custom method to see if the password matches
            const isMatch = await user.comparePassword(password);
            if(!isMatch){
                return res.status(401).json({message: "invalid email or password credientials"})

            }

        // 🌟 NEW STEP: Generate our secure digital passport token!
        const token = user.generateAuthToken();

        // 3. Success! Return the token back to the frontend client
        res.status(200).json({
        message: "login successful, welcome back",
        token: token,
        userId : user._id
                })            
    }catch(err){
        next(err)
    }
} 