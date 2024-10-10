import express from "express";
import {
  getAllPrices,
  removeFromWatchlist,
  addToWatchlist,
  getWatchlist
} from "../controllers/priceController.js";

import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();


router.get("/", verifyJWT, getAllPrices);
router.delete("/watchlist/remove/:id", verifyJWT, removeFromWatchlist);
router.post("/watchlist/add/:id", verifyJWT, addToWatchlist);
router.get('/watchlist',verifyJWT, getWatchlist);

export default router;
