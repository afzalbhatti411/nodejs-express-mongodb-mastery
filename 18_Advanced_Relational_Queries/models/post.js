import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "title must be given"],
    },
    content: {
        type: String, 
        required: [true, "content must be given"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "a post must belongs to a valid user account"]
    }
})

const Post = mongoose.model('Post', postSchema);
export default Post; 
