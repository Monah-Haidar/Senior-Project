import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  logout,
} from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", verifyJWT, getUser);
router.get("/all", verifyJWT, getAllUsers);

router.post("/create", createUser);
router.post("/login", loginUser);

router.put("/", verifyJWT, updateUser);
router.delete("/", verifyJWT, deleteUser);
router.get("/logout", logout);

export default router;