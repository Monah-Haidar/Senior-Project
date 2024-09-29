import User from "../models/user.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
};

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.user_id !== decoded.user_id) return res.sendStatus(403);
        const accessToken = generateAccessToken({ user_id: user.user_id });
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default handleRefreshToken;
