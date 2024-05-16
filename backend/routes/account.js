import express from 'express';
import { createAccount, getAllAccounts, updateBalance, getAccount } from '../controllers/accountController.js';
import authenticateUser from "../middleware/authenticateUser.js";
const router = express.Router()

router.post('/create',authenticateUser,createAccount)
router.get('/', authenticateUser, getAllAccounts)
router.put('/update-balance/:id', authenticateUser, updateBalance)
router.get("/:id", authenticateUser, getAccount)

export default router;