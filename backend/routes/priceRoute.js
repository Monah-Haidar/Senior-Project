import express from "express";
import {
  getAllPrices,
  removeFromWatchlist,
  addToWatchlist,
} from "../controllers/priceController.js";
// import { getAllWatchlists } from "../controllers/watchlistController.js";
import verifyJWT from "../middleware/verifyJWT.js";
const router = express.Router();

router.get("/", verifyJWT, getAllPrices);
router.post("/watchlist/remove", verifyJWT, removeFromWatchlist);
router.post("/watchlist/add", verifyJWT, addToWatchlist);
// router.get('/watchlist',verifyJWT, getAllWatchlists);

export default router;
