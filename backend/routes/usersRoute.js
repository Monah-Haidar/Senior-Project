import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
//   logout,
} from "../controllers/usersController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/", authenticateUser, getUser);
router.get("/all", authenticateUser, getAllUsers);

router.post("/create", createUser);
router.post("/login", loginUser);

router.put("/", authenticateUser, updateUser);
router.delete("/", authenticateUser, deleteUser);
// router.post("/logout", logout);

export default router;