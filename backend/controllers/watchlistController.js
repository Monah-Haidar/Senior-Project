import Watchlist from "../models/watchlist.js";
import Instrument from "../models/instrument.js";
import Account from "../models/account.js";

const addToWatchlist = async (req, res) => {
  try {
    const { instrument_id } = req.body;
    const watchlistItem = await Watchlist.create({ instrument_id });
    return res.status(200).json(watchlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllWatchlists = async (req, res) => {
  try {
    const user_id = req.user_id;


    const account = await Account.findOne({ where: { user_id: user_id, account_type: "Futures" } });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const watchlists = await Watchlist.findAll({
      where: { account_id: account.account_id },
      include: [
        {
          model: Instrument,
        },
      ],
    });

    if (!watchlists) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    // console.log(watchlists);
    return res.status(200).json(watchlists[0].Instruments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export { getAllWatchlists };
