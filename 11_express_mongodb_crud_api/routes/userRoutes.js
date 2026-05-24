import express, { json } from "express";
import mongoose from "mongoose";;
import mongodb from "mongodb";
import User from "../models/user.js";

const router = express.Router();

// create get route - to access only five users, newest first 
router.get('/search', async (req, res)=>{
    try{
    const freshUsers = await User.find()
    .sort({createdAt : -1})
    .limit(5)
    res.status(200).json(freshUsers);
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

// create post route - to add a new user
router.post('/', async (req, res)=>{
    try{
    const newUser = new User ({name: req.body.name});
    const savedUser = newUser.save();
    res.status(201).json({message: "new user added successfully"}, newUser);
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// create put route-to update an existing user 
router.put('/:id', async (req, res)=>{
    try{
    // find the user
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {name: req.body.name});
    // validate the user 
    if(!updatedUser) return res.status(404).json({message: "user not found"})
        // respond 
    res.json({message: "user updated successfully"}, updatedUser);

    } catch(err){
        res.status(500).json({error: err.message})
    }
});

// create a delete route-to remove an existing user 
router.delete('/:id', async (req, res)=>{
    try{
    // find the existing user 
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    // validate user 
    if(!deletedUser) return res.status(404).json("user not found");
    // respond 
    res.json({message: "user deleted successfully"}, deletedUser);

    } catch(err){
        res.status(500).json({error: err.message})
    }
})

export default router;
