import express from 'express';
import { createAlert, getAlerts, sendAlert } from '../controllers/alertController.js';

const router = express.Router();

router.post('/', sendAlert);
router.get('/notifications', getAlerts);
router.post('/create', createAlert);
router.get('/all', getAlerts);
 
export default router;