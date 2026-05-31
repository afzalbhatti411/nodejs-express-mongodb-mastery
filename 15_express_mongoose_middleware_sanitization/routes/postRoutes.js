import express from "express";

import { 
    createNewPost,
    getAllFreshPosts,
    updateExistingPost,
    deleteExistingPost
} from "../controllers/postController.js"

const router = express.Router();

router.post('/', createNewPost);
router.get('/feed', getAllFreshPosts);
router.put('/:id', updateExistingPost);
router.delete('/:id', deleteExistingPost);

export default router;

