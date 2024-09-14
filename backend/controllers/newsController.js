import New from "../models/new.js";

const getCryptoNews = async (req, res) => {
  try {
    // await New.sync();
    const cryptoNews = await New.findAll({
      where: {
        category: "crypto",
      },
      order: [["createdAt", "DESC"]],
      limit: 12,
    });

    return res.json(cryptoNews);
    
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
