import Article from "../models/article.js";

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    return res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAllArticles;
