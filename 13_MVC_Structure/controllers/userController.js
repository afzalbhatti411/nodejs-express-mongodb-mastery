import User from "../models/user.js";

export const getFreshUsers = async (req, res, next)=>{
    try{
        const freshUsers = await User.find().sort({createdAt : -1}).limit(5);

        res.status(200).json(freshUsers);
    } catch(err){
        next(err)
    }
}

export const createNewUser = async (req, res, next)=>{
    try{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
    })
        const savedUser = await newUser.save();
        res.status(201).json({message: "user created successfully",  savedUser})

    } catch(err){
        next(err)
    }
}

// create put route
export const updateExistingUser = async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name: req.body.name, email: req.body.email, age: req.body.age},
            {new: true, runValidators: true}
        )
        if(!updatedUser){
            const error = new Error(`user with user id # ${req.params.id} was not found`);
            err.status = 404;
            return next(err);
        }
        res.status(200).json({message: "user updated successfully", updatedUser})
    }catch(err){
        next(err)
    }
}

// create delete route
export const deleteExistingUser = async(req, res, next)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            const error = new Error(`user having ID # ${req.params.id} was not found`);
            error.status = 404; 
            return next(error);
        }
        res.status(200).json({message: " user deleted successfully", deletedUser})

    } catch(err){
        next(err)
    }
}

 















// import User from "../models/user.js";

// // 1. GET ALL/SEARCH CONTROLLER
// export const getFreshUsers = async (req, res, next) => {
//     try {
//         const freshUsers = await User.find().sort({ createdAt: -1 }).limit(5);
//         res.status(200).json(freshUsers);
//     } catch (err) {
//         next(err);
//     }
// };

