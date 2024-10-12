import Account from "../models/account.js";
import Watchlist from "../models/watchlist.js";

const createAccountFromUser = async (user_id) => {
  try {
    // await Account.sync();

    const account = await Account.create({
      account_type: "Futures",
      user_id: user_id,
    });

    // const watchlist = await Watchlist.create({
    //   account_id: account.account_id,
    //   watchlist_id: account.account_id,

    // });

    //return res.json({ message: "Account created", account: account});

    return {
      message: "Account & Watchlist created",
      account: account,
      // watchlist: watchlist,
    };
  } catch (err) {
    console.error(err);
    res.status(500).json({ "message from createAccountFromUser": err.message });
  }
};

const updateBalance = async (req, res) => {
  try {
    const id = req.params.id;

    const { total_balance } = req.body;

    const account = await Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.total_balance = total_balance;

    await account.update({ total_balance });

    return res.json({
      message: "Balance updated",
      account: account,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const user_id = req.user_id;

    // const user_id = 1;

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.json({
      "Total Balance": account.total_balance,
      message: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export { createAccountFromUser, updateBalance, getBalance };

/////////////////////////////////////////////////////////////////////////////////

// Not used since account is created from user controller when user is created and there is only one account types
const createAccount = async (req, res) => {
  try {
    await Account.sync();

    const { account_type, total_balance, base_currency } = req.body;

    const user_id = req.user_id;

    const existingAccount = await Account.findAll({
      where: { user_id: user_id, account_type: account_type },
    });

    if (existingAccount !== null) {
      return res.status(400).json({ message: "Account already exists" });
    }

    const account = await Account.create({
      account_type,
      total_balance,
      base_currency,
      user_id: user_id,
    });

    return res.json({
      message: "Account created successfully",
      account: account,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// not used since there is no admin panel
const getAllAccounts = async (req, res) => {
  try {
    const user_id = req.user_id;

    const accounts = await Account.findAll({ where: { user_id: user_id } });

    return res.json({
      message: "Account retrieved successfully",
      accounts: accounts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// not used since there is no admin panel
const getAccount = (req, res) => {
  try {
    const id = req.params.id;

    const account = Account.findByPk(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
