import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

const logTransaction = async (
    account_id,
    amount,
    timestamp,
    status,
    type,
    payment_method
  ) => {
    await Transaction.sync();
    await Transaction.create({
      account_id,
      amount,
      timestamp,
      status,
      type,
      payment_method,
    });
    console.log("Transaction created");
  };

const getAllTransactions = async (req, res) => {
  try {
    const user_id = req.user_id;
    const account = await Account.findOne({
      where: { user_id, account_type: "Futures" },
    });
    const transactions = await Transaction.findAll({
      where: { account_id: account.account_id },
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ transactions });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export { getAllTransactions, logTransaction };
