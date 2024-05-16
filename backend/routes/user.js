import express from 'express';
import { createUser, updateUser, deleteUser, getUser, getAllUsers, loginUser } from '../controllers/userController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/',authenticateUser, getAllUsers);

router.post('/create',createUser);
router.post('/login', loginUser);

router.put('/:id',updateUser);
router.delete('/:id', deleteUser);



export default router;