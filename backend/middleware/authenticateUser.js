import extractUserIdFromToken from "./extractUserIdFromToken.js";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const user_id = extractUserIdFromToken(token);
  if (!user_id) {
    return res.status(401).json({ error: "Unauthorized. Invalid token" });
  }
  req.user_id = user_id;
  next();
};

export default authenticateUser;