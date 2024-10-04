import New from "../models/new.js";
import { Op } from "sequelize";

const getCryptoNews = async (req, res) => {
  try {
    // await New.sync();
    const coindeskNews = await New.findAll({
      where: {
        category: "crypto",
        source_name: "coindesk",
      },
      order: [["createdAt", "DESC"]],
      limit: 9,
    });

    // Fetch 3 articles where category is "crypto" and source_name is not "coindesk"
    const otherCryptoNews = await New.findAll({
      where: {
        category: "crypto",
        source_name: { [Op.ne]: "coindesk" },  // Op.ne stands for "not equal"
      },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    // Combine the two results into a single array
    const combinedNews = [...coindeskNews, ...otherCryptoNews];

 
    return res.json(combinedNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getForexNews = async (req, res) => {
  try {
    // await New.sync();
    const forexNews = await New.findAll({
      where: {
        category: "forex",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(forexNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEconomyNews = async (req, res) => {
  try {
    // await New.sync();
    const economyNews = await New.findAll({
      where: {
        category: "economy",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(economyNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getWorldNews = async (req, res) => {
  try {
    // await New.sync();
    const worldNews = await New.findAll({
      where: {
        category: "general",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(worldNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getGoldNews = async (req, res) => {
  try {
    // await New.sync();
    const goldNews = await New.findAll({
      where: {
        category: "gold",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(goldNews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const positiveSentimentNews = async (req, res) => {
  try {
    // await New.sync();
    const result = await New.findAll({
      where: {
        sentiment: "Positive",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const negativeSentimentNews = async (req, res) => {
  try {
    // await New.sync();
    const result = await New.findAll({
      where: {
        sentiment: "Negative",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const neutralSentimentNews = async (req, res) => {
  try {
    // await New.sync();
    const result = await New.findAll({
      where: {
        sentiment: "Neutral",
      },
      order: [["createdAt", "DESC"]],
      limit:12
    });

    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  getCryptoNews,
  getForexNews,
  getEconomyNews,
  getWorldNews,
  getGoldNews,
  positiveSentimentNews,
  negativeSentimentNews,
  neutralSentimentNews,
};
