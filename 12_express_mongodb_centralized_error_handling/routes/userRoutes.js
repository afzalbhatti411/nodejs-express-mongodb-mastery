import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";

const router = express.Router();
// get route-to know the total number of user in my mongodb
router.get('/count', async (req, res, next)=>{
    try{
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            success: true, 
            total: totalUsers
        })

    }catch(err){
        next(err);
    }
})

// get route-to access first five users data

router.get('/search', async (req, res, next)=>{
    try{
        const getUsers = await User.find()
        .sort({createdAt : -1})
        .limit(5)

        res.status(200).json(getUsers);
        
    }catch(err){
        next(err);
    }
})
// post route -to add a  new user 
router.post('/', async (req, res, next)=>{
    try{
        const newUser = new User({
            name: req.body.name, 
            email: req.body.email, 
            age: req.body.age
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        next(err)
    }
})
// put route-to update an existing user
router.put("/:id", async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name, 
                email: req.body.email, 
                age: req.body.age
            },
            {new: true, runValidators: true}
        )
        if(!updatedUser){
            const error = new Error(`user with ID# ${req.params.id} was not found`);
            error.status = 404;
            return next(err);
        }
        res.status(200).json({message: "user updated successfully", updatedUser})

    }catch(err){
        next(err);
    }
})
// Delete Route - remove an existing user 
router.delete('/:id', async (req, res, next)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            const error = new Error(`user with id # ${req.params.id} was not found`);
            error.status = 404;
            return next(error)
        }
        res.status(200).json({message: "user deleted successfully", deletedUser})

    }catch(err){
        next(err);
    }
})

export default router;







































// import express, { json } from "express";
// import mongoose from "mongoose";;
// import mongodb from "mongodb";
// import User from "../models/user.js";

// const router = express.Router();

// // create get route - to access only five users, newest first 

// router.get('/search', async (req, res, next)=>{
//     try{
//     const freshUsers = await User.find()
//     .sort({createdAt : -1})
//     .limit(5)
//     res.status(200).json(freshUsers);
//     } catch(err){
//         next(err);
//     }
// })

// // create post route - to add a new user
// router.post('/', async (req, res, next)=>{
//     try{
//     const newUser = new User ({
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//     });
//     const savedUser = await newUser.save();
//     res.status(201).json({message: "new user added successfully", savedUser});
//     }catch(err){
//         next(err);
//     }
// })

// // create put route-to update an existing user 
// router.put('/:id', async (req, res, next)=>{
//     try{
//     // find the user
//     const updatedUser = await User.findByIdAndUpdate(
//         req.params.id, 
//         {name: req.body.name, email: req.body.email, age: req.body.age},
//         {new: true, runValidators: true},
//     );
//     // validate the user 
//     if(!updatedUser){
//         const error = new Error(`user not found in db`);
//         error.status = 404;
//         return next(error);
//     };
//         // respond 
//     res.json({message: "user updated successfully", updatedUser});

//     } catch(err){
//         next(err);
//     }
// });

// // create a delete route-to remove an existing user 
// router.delete('/:id', async (req, res, next)=>{
//     try{
//     // find the existing user 
//     const deletedUser = await User.findByIdAndDelete(req.params.id)
//     // validate user 
//     if(!deletedUser){
//         const error = new Error(`user not foud in database`);
//         error.status = 404;
//         return next(error);
//     }
//     // respond 
//     res.json({message: "user deleted successfully", deletedUser});

//     } catch(err){
//         next(err);
//     }
// })

// export default router;
