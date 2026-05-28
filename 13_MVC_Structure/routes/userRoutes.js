import express from "express";

import {
    getFreshUsers,
    createNewUser,
    updateExistingUser,
    deleteExistingUser, 

} from "../controllers/userController.js";


const router = express.Router();

// Route Mapping 

router.get('/search', getFreshUsers);
router.post('/', createNewUser);
router.put('/:id', updateExistingUser);
router.delete('/:id', deleteExistingUser);




export default router;























// import express from "express";
// // Import our controllers using object destructuring
// import { 
//     getFreshUsers, 
//     // createNewUser, 
//     // updateExistingUser, 
//     // removeUser, 
//     // getUserCount 
// } from "../controllers/userController.js";

// const router = express.Router();

// // Route mappings
// router.get('/search', getFreshUsers);
// // router.get('/count', getUserCount); // Placed safely above /:id
// // router.post('/', createNewUser);
// // router.put('/:id', updateExistingUser);
// // router.delete('/:id', removeUser);

// export default router;