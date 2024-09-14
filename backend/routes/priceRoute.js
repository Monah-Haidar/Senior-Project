import express from "express";
import getAllPrices from "../controllers/priceController.js";
const router = express.Router();

router.get('/', getAllPrices);


export default router;