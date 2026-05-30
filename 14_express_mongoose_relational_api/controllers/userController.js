import User from "../models/user.js";

export const createNewUser = async (req, res, next)=>{
    try{
        const newUser = new User({
            name: req.body.name, 
            email: req.body.email, 
            age: req.body.age,
        })
        const savedUser = await newUser.save();
        res.status(201).json({message: "user created successfully" ,savedUser});

    }catch(err){
        next(err)
    }
}

// to get fresh users

export const getFreshUsers = async(req, res, next)=>{
    try{
        const freshUsers = await User.find().sort({createdAt : -1}).limit(5);
        res.status(200).json(freshUsers);
    }catch(err){
        next(err)
    }
}

