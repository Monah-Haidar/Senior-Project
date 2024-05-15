import jwt from 'jsonwebtoken';

const extractUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.user_id;
    return user_id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default extractUserIdFromToken;
