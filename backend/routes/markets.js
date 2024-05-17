import express from 'express';
import { getMarketPriceFromAPI } from '../apis/marketsPriceAPI.js';

const router = express.Router();

router.get('/', getMarketPriceFromAPI);

export default router;