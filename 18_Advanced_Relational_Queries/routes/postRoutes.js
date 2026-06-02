import express from "express";

import {
    createNewPost,
    getFreshPosts,
    updateExistingPost, 
    getSinglePost,
    deleteExistingPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post('/', createNewPost);
router.get('/feed', getFreshPosts);

// id specific routes 
router.put('/:id', updateExistingPost);
router.delete('/:id', deleteExistingPost);
router.get('/:id', getSinglePost)


export default router;