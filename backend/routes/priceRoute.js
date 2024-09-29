import express from "express";
import getAllPrices from "../controllers/priceController.js";
import { getAllWatchlists } from "../controllers/watchlistController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.get('/', getAllPrices);
router.get('/watchlist',verifyJWT, getAllWatchlists);

export default router;