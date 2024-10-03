import nodemailer from "nodemailer";
import User from "../models/user.js";
import Alert from "../models/alert.js";
import Account from "../models/account.js";

// nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_SECRET,
  },
});

// send email
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// send email alert template
const sendAlert = async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = await User.findByPk(user_id);
    const to = user.email;
    const subject = "Alert";
    const html = "<h1>Alert</h1>";

    await sendEmail(to, subject, html);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// create alert in database
const createAlert = async (req, res) => {
  // await Alert.sync();

  try {
    const { message, threshold, expiration_date } = req.body;

    const user_id = req.user_id;
    const numberOfDays = expiration_date;

    const expirationDate = new Date(
      Date.now() + numberOfDays * 24 * 60 * 60 * 1000
    );

    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    const alert = await Alert.create({
      message: message,
      threshold,
      status: "active",
      expiration_date,
      account_id: account.account_id,
    });

    return res.status(200).json({
      message: "Alert created successfully",
      data: alert,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// retrieve alerts from database
const getAlerts = async (req, res) => {
  try {
    // await Alert.sync({ force: true });
    const user_id = req.user_id;
    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Futures" },
    });

    // console.log(account.account_id);
    if (account == null) {
      return res.status(404).json({ message: "Account not found" });
    }
    const alerts = await Alert.findAll({
      where: { account_id: account.account_id, status: "active" },
    });

    return res.status(200).json({ alerts: alerts });
  } catch (err) {
    console.error("Get Alerts Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export { sendEmail, sendAlert, createAlert, getAlerts };
