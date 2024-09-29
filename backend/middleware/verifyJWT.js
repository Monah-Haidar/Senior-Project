//import extractUserIdFromToken from "./extractUserIdFromToken.js";
import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user_id = decodedToken.user_id;

  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized. Invalid token" });
  }

  req.user_id = user_id;

  next();
};

export default verifyJWT;
