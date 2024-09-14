import express from "express";
import {
  getCryptoNews,
  getForexNews,
  getEconomyNews,
  getWorldNews,
  getGoldNews,
  positiveSentimentNews,
  negativeSentimentNews,
  neutralSentimentNews,
} from "../controllers/newsController.js";
const router = express.Router();

router.get("/crypto", getCryptoNews);
router.get("/forex", getForexNews);
router.get("/gold", getGoldNews);

router.get("/economy", getEconomyNews);
router.get("/world", getWorldNews);

router.get("/positive-sentiment", positiveSentimentNews);
router.get("/negative-sentiment", negativeSentimentNews);
router.get("/neutral-sentiment", neutralSentimentNews);

export default router;
