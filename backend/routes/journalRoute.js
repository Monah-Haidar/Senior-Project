import express  from "express";
import { createEntry, getAllEntries, updateEntry, deleteEntry } from "../controllers/journalEntriesController.js";

const router = express.Router();

router.get("/", getAllEntries);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
