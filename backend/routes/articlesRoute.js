import express from "express";
import getAllArticles from "../controllers/articlesController.js";

const router = express.Router();

router.get("/", getAllArticles);

export default router;