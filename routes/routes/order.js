import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import { createOrder, getAllOrders, updateOrder, updateStatus } from '../controllers/orderController.js';
const router = express.Router();


router.get('/', authenticateUser, getAllOrders)
router.post('/create', authenticateUser, createOrder);
router.put('/update-order/:id', authenticateUser, updateOrder)
router.put('/close-order/:id', authenticateUser, updateStatus)

export default router;