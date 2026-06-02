import Post from "../models/post.js";
import User from "../models/user.js"

export const createNewPost = async (req, res, next)=>{
    try{
        const newPost = new Post({
            title: req.body.title, 
            content: req.body.content, 
            user: req.body.userId,
        });

        const savedPost = await newPost.save();
        res.status(201).json({message: "new post created successfully", savedPost});
    }catch(err){
        next(err)
    }
}

// to get all posts 
export const getFreshPosts = async (req, res, next)=>{
    try{
        const freshPosts = await Post.find().populate("user", "name email");
        res.status(200).json(freshPosts);
    }catch(err){
        next(err)
    }
}

// get a single post by ID
export const getSinglePost = async (req, res, next)=>{
    try{
        const singlePost = await Post.findById(req.params.id).populate("user", "name email");

        if(!singlePost){
            const error = new Error (`post having id # ${req.params.id} was not found`);
            error.status = 404;
            return next(error);
        }
        res.status(200).json(singlePost)

    }catch(err){
        next(err)
    }
}

// update a post details
export const updateExistingPost = async (req, res, next)=>{
    try{
        const updatePost = await Post.findByIdAndUpdate(
            req.body.id, 
            {title: req.body.title},
            {content: req.body.content},
            {new: true, runValidators: true}
        )
        if(!updatePost){
            const error = new Error(`error caught under post ID # ${req.params.id}`);
            error.status = 404;
            return next(error);
        }
        res.status.json({message: "post updated successfully", updatePost})

    }catch(err){
        next(err);
    }
}

// delete an existing post
export const deleteExistingPost = async (req, res, next)=>{
    try{
        const deletePost = await Post.findByIdAndDelete(req.params.id);

        if(!deletePost){
            const error = new Error(`post having ID # ${req.params.id} was not found`);
            error.status= 404;
            return next(error);
        }
        res.status(200).json({message: "post deleted successfully", deletePost})

    }catch(err){
        next(err);
    }
}