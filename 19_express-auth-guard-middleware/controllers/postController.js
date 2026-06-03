import Post from "../models/post.js";
import User from "../models/user.js"

export const createNewPost = async (req, res, next)=>{
    try{
        const newPost = new Post({
            title: req.body.title, 
            content: req.body.content, 
            user: req.user._id,
        });

        const savedPost = await newPost.save();
        res.status(201).json({message: "new post created securely", savedPost});
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
        // 1️⃣ Find the post first to verify who owns it
        const post = await Post.findById(req.body.id);
        
        if(!post){
            const error = new Error(`Post having ID # ${req.body.id} was not found`);
            error.status = 404;
            return next(error);
        }
        // 2️⃣ 🛡️ SECURITY CHECK: Compare the post author reference with the token's user passport ID
       
        if (post.user.toString() !== req.user._id.toString()) {
            const error = new Error("Unauthorized action. You do not own this post.");
            error.status = 403; // 403 Forbidden
            return next(error);
        }

        // 3️⃣ Run your preferred update pattern with FIXED argument grouping
        const updatedPost = await Post.findByIdAndUpdate(
            req.body.id, 
            {title: req.body.title, content: req.body.content},
            { new: true, runValidators: true } 
        );

        res.status(200).json({ message: "post updated successfully", updatedPost });

    }catch(err){
        next(err)
    }
}

// delete an existing post
// delete a specific post
export const deleteExistingPost = async (req, res, next) => {
    try {
        // 1️⃣ Step 1: Find the target post using the URL parameter ID
        const post = await Post.findById(req.params.id);

        if (!post) {
            const error = new Error(`Post having ID # ${req.params.id} was not found`);
            error.status = 404;
            return next(error);
        }

        // 2️⃣ Step 2: 🛡️ SECURITY CHECK: Compare post author with the token user passport
        if (post.user.toString() !== req.user._id.toString()) {
            const error = new Error("Unauthorized action. You cannot delete someone else's post.");
            error.status = 403; // 403 Forbidden
            return next(error);
        }

        // 3️⃣ Step 3: Authorized! Safe to delete from MongoDB
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted successfully" });

    } catch (err) {
        next(err);
    }
};