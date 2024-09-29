import express from 'express';
import { createOrder, createLimitOrder,modifyOrder, closeOrder, getAllOrders } from '../controllers/ordersController.js';
const router = express.Router();


router.get('/all', getAllOrders)
router.post('/create', createOrder);
router.post('/create-limit', createLimitOrder)
router.put('/modify/:id', modifyOrder)
router.post('/close/:id', closeOrder)

export default router;