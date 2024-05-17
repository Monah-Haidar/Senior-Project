import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';

const router = express.Router();

router.get('/:id', getJournal);
router.get('/', authenticateUser,getAllJournals);

router.post('/create', createJournal);

router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

export default router;