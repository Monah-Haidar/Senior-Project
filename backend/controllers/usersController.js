import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "./alertController.js";
import { createAccountFromUser } from "./accountsController.js";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createUser = async (req, res) => {
  try {
    await User.sync();

    const { first_name, last_name, username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser !== null) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashPassword,
    });

    const account = await createAccountFromUser(user.user_id);

    return res.json({
      user: user,
      //accessToken: accessToken,
      //account_id: account.account_id,
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ "message from createUser": err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken({ user_id: user.user_id });
    const refreshToken = generateRefreshToken({ user_id: user.user_id });

    await User.update(
      {refresh_token: refreshToken},
      {
        where: {
          email: user.email
        }
      }
      );

    
    const html = `<h1>A new login has been made</h1>`;
    await sendEmail(email, "Login", html);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      accessToken: accessToken,
      user: user,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.user_id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.user_id

    const { first_name, last_name, password } = req.body;

    //const id = req.user_id;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (first_name) {
      user.update({ first_name });
      res.json({ message: "First name updated" });
    }

    if (last_name) {
      user.update({ last_name });
      res.json({ message: "Last name updated" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.update({ password: hashPassword });
      res.json({ message: "Password updated" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.user_id;

    // const id = req.params.id;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const logout = (req, res) => {
//   res.clearCookie("token", { httpOnly: true });
//   res.json({ message: "Logout successful" });
// };

export {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  //   logout,
};
