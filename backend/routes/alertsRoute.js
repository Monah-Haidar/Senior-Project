import express from 'express';
import { createAlert, getAlerts, sendAlert, deleteAlert } from '../controllers/alertController.js';

const router = express.Router();

router.post('/', sendAlert);
router.get('/notifications', getAlerts);
router.post('/create', createAlert);
router.get('/all', getAlerts);
router.delete('/:id', deleteAlert);
 
export default router;