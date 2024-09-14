import express from "express";
import { getAllTransactions, logTransaction } from "../controllers/transactionsController.js";
import { createPayment, deposit, withdraw } from "../controllers/paymentsController.js";
import authenticateUser from "../middleware/authenticateUser.js";
const router = express.Router();

router.get("/", getAllTransactions);

router.post("/create-payment-intent", authenticateUser, createPayment);
router.post('/deposit', authenticateUser, deposit);
router.post('/withdraw', authenticateUser, withdraw);

export default router;