import express from "express";
import {createNewUser, getFreshUsers} from "../controllers/userController.js"

const router = express.Router();

router.post('/', createNewUser);
router.get('/search', getFreshUsers);


export default router;
