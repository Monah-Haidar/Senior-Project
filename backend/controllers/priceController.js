import Instrument from "../models/instrument.js";
import Account from "../models/account.js";
import User from "../models/user.js";
import Watchlist from "../models/watchlist.js";

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

const getWatchlist = async (req, res) => {
  try {
    const user_id = req.user_id;

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Query all instruments linked to the user's watchlist
    const watchlist = await Watchlist.findAll({
      where: { account_id: account.account_id },
      include: [{
        model: Instrument,
       
        attributes: ['instrument_id', 'rank', 'name', 'symbol', 'price', 'volume_24h', 'volume_change_24h', 'percent_change_24h', 'market_cap', 'circulating_supply', 'total_supply'], // Fetch relevant fields from Instrument table
      }],
    });

    // Check if watchlist is empty
    if (!watchlist.length) {
      return res.status(404).json({ message: "No instruments in watchlist" });
    }

    return res.status(200).json({ watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    
    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    
    const account = await Account.findOne({
      where: { user_id: req.user_id, account_type: "Futures" },
    });
    
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const watchlist = await Watchlist.findOne({
      where: { account_id: account.account_id, instrument_id: id },
    });
    
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    await Watchlist.destroy({ where: { instrument_id: id, watchlist_id: watchlist.watchlist_id } });
    
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
    await Watchlist.sync({ force: false });

    const id = req.params.id;
  
    if (!id) {
      return res.status(400).json({ message: "Missing id parameter" });
    }

    const account = await Account.findOne({
      where: { user_id: req.user_id, account_type: "Futures" },
    });
    
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
   
    const watchlist = await Watchlist.create({ watchlist_id: account.account_id, account_id: account.account_id, instrument_id: id});
    
    if (!watchlist) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    return res
      .status(200)
      .json({ message: "Instrument added to watchlist" });
  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(500).json({ message: err.message });
  }
};

export { getAllPrices, removeFromWatchlist, addToWatchlist, getWatchlist };
