import "dotenv/config";
import stripe from "stripe";
import User from "../models/user.js";
import Account from "../models/account.js";

import { sendEmail } from "./alertController.js";
import { logTransaction } from "./transactionsController.js";

const stripe_instance = stripe(process.env.STRIPE);

const createPayment = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Step 1: Create a payment intent with Stripe
    const paymentIntent = await stripe_instance.paymentIntents.create({
      amount,
      currency,
    });

    // Step 2: Send the paymentIntentId to the frontend
    res.status(200).send({
      message: "Payment Intent created successfully",
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

const deposit = async (req, res) => {
  const { amount } = req.body;
  try {
    const user_id = req.user_id;

    const account = await Account.findOne({ where: { user_id } });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit details" });
    }

    account.total_balance += amount;

    await account.save();

    //send email
    const user = await User.findByPk(account.user_id);

    await sendEmail(
      user.email,
      "Deposit Successful",
      `<h1>Deposit Successful</h1>`
    );

    // log transaction
    logTransaction(
      amount,
      new Date(),
      "success",
      "deposit",
      "stripe",
      account.account_id
    );

    res.status(200).json({
      message: "Deposit successful",
      balance: account.total_balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;

  try {
    const user_id = req.user_id;

    const account = await Account.findOne({ where: { user_id } });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    account.total_balance -= amount;

    await account.save();

    //send email
    const user = await User.findByPk(account.user_id);

    await sendEmail(
      user.email,
      "Withdrawal Successful",
      `<h1>Withdrawal Successful</h1>`
    );

    //log transaction
    logTransaction(
      amount,
      new Date(),
      "success",
      "withdrawal",
      "stripe",
      account.account_id
    );

    res.status(200).json({
      message: "Withdrawal successful",
      balance: account.total_balance,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { createPayment, deposit, withdraw };
