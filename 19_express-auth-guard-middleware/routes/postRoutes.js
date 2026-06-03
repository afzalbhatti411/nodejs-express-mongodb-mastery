import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import {
    createNewPost,
    getFreshPosts,
    updateExistingPost, 
    getSinglePost,
    deleteExistingPost,
} from "../controllers/postController.js";

const router = express.Router();

// 🎫 Protected Routes: The gate guard runs BEFORE the database controller
router.post('/', protectRoute, createNewPost);
router.put('/', protectRoute, updateExistingPost);
router.delete('/:id', protectRoute, deleteExistingPost);

// 🌍 Public Routes: Anyone on the web can read the feed or single posts without a token!
router.get('/feed', getFreshPosts);
router.get('/:id', getSinglePost);


export default router;