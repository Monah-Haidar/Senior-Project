import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import { createOrder, modifyOrder, closeOrder, getAllOrders } from '../controllers/ordersController.js';
const router = express.Router();


router.get('/', authenticateUser, getAllOrders)
router.post('/create', authenticateUser, createOrder);
router.put('/modify/:id', authenticateUser, modifyOrder)
router.post('/close/:id', authenticateUser, closeOrder)

export default router;