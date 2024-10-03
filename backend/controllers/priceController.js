import Instrument from "../models/instrument.js";
import Account from "../models/account.js";
import User from "../models/user.js";

const getAllPrices = async (req, res) => {
  try {
    const user_id = req.user_id;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const dataList = await Instrument.findAll({ order: [["rank", "ASC"]] });

    return res.json({ prices: dataList, account_id: account.account_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const instument = await Instrument.findByPk(id);
    if (!instument) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    await Instrument.update(
      { watchlist_id: null },
      { where: { instrument_id: id } }
    );

    return res
      .status(200)
      .json({ message: "Instrument removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};



const addToWatchlist = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const instument = await Instrument.findByPk(id);
    if (!instument) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    const account = await Account.findOne({
      where: { user_id: req.user_id, account_type: "Futures" },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await Instrument.update(
      { watchlist_id: account.account_id },
      { where: { instrument_id: id } }
    );

    return res
      .status(200)
      .json({ message: "Instrument removed from watchlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export { getAllPrices, removeFromWatchlist, addToWatchlist };
