import express from 'express';
import { createUser, updateUser, deleteUser, getUser, getAllUsers, loginUser } from '../controllers/userController.js';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();


router.post('/create',createUser)
router.put('/:id',updateUser  )
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.get('/',authenticateUser, getAllUsers)
router.post('/login', loginUser)

export default router;