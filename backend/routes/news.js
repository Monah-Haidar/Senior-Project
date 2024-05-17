import express from 'express';
import { getNewsDataFromAPI } from '../apis/newsAPI.js';

const router = express.Router();

router.get('/', getNewsDataFromAPI);

export default router;