import express from "express";
import { getAllTransactions, logTransaction } from "../controllers/transactionsController.js";
import { createPayment, deposit, withdraw } from "../controllers/paymentsController.js";
const router = express.Router();

router.get("/all", getAllTransactions);
router.post("/create-payment-intent", createPayment);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);

export default router;