import express from 'express';
import { createAlert, getAlerts, sendAlert } from '../controllers/alertController.js';
import authenticateUser from '../middleware/authenticateUser.js';
const router = express.Router();

router.post('/', authenticateUser, sendAlert);
router.get('/notifications', authenticateUser,  getAlerts);
router.post('/create', authenticateUser, createAlert);
router.get('/all', authenticateUser, getAlerts);
 
export default router; 