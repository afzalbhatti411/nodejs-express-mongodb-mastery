import Post from "../models/post.js";

export const createNewPost = async(req, res, next)=>{
    try{
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            user: req.body.userId,
        }) 
        const savedPost = await newPost.save();
        res.status(201).json({message: "post created successfully", savedPost});

    }catch(err){
        next(err);
    }
} 

// to get fresh posts 
export const getAllFreshPosts = async (req, res, next)=>{
    try{
        const getFreshPosts = await Post.find().populate("user", "name email");
        res.status(200).json(getFreshPosts)

    }catch(err){
        next(err);
    }
}

// to updated an existing post 

export const updateExistingPost = async (req, res, next)=>{
    try{
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            {title: req.body.title, content: req.body.contenet, userId: req.body.userId},
            {new: true, runValidators: true} 
        )
        if(!updatePost){
            const error = new Error(`post having id # ${req.params.id} was not found`);
            err.status = 404;
            return next(error);
        }
        res.status(200).json({message: "post updated successfully", updatePost})

    }catch(err){
        next(err)
    }
}

// to delete an existing post 

export const deleteExistingPost = async (req, res, next)=>{
    try{
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        
        if(!deletePost){
            const error = new Error(`post having id # ${req.params.id} was not found`);
            err.status = 404;
            return next(err);
        }
        res.status(200).json({message: "post deleted successfully", deletePost})

    }catch(err){
        next(err)
    }
}
