import express from 'express';
import {createJournal, getJournal, getAllJournals, updateJournal, deleteJournal} from '../controllers/jounalController.js';
import authenticateUser from '../middleware/authenticateUser.js';


const router = express.Router();

router.get('/:id', getJournal);
router.get('/', authenticateUser,getAllJournals);

router.post('/create', createJournal);

router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);