// for mongodb database schema

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "title is must"],
        trim: true
    },
    content: {
        type: String, 
        required: [true, "content is mandatory"]
    },
    imageName: {
        type: String, 
        required: [true, "image name is important"]
    },
        createdAt: {
            type: Date, 
            default: Date.now(),
        }
})

const Post = mongoose.model("Post", postSchema);
export default Post;