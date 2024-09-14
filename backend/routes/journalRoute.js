import express  from "express";
import { createEntry, getAllEntries, updateEntry, deleteEntry } from "../controllers/journalEntriesController.js";
import authenticateUser from "../middleware/authenticateUser.js";
const router = express.Router();

router.get("/", authenticateUser, getAllEntries);
router.post("/", authenticateUser, createEntry);
router.put("/:id", authenticateUser, updateEntry);
router.delete("/:id", authenticateUser, deleteEntry);

export default router;
