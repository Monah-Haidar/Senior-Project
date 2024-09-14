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

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create alert in database
const createAlert = async (req, res) => {
  await Alert.sync();

  const user_id = req.user_id;
  const numberOfDays = req.body.expiration_date;

  const expirationDate = new Date(
    Date.now() + numberOfDays * 24 * 60 * 60 * 1000
  );

  const account = await Account.findOne({
    where: { user_id: user_id, account_type: "Future" },
  });

  const alert = await Alert.create({
    message: req.body.message,
    threshold: req.body.threshold,
    status: "active",
    expiration_date: expirationDate,
    account_id: account.account_id,
  });

  res.status(200).json({
    message: "Alert created successfully",
    data: alert,
  });
};

// retrieve alerts from database
const getAlerts = async (req, res) => {
  try {
    // await Alert.sync();
    const user_id = req.user_id;
    const account = await Account.findOne({
      where: { user_id: user_id, account_type: "Future" },
    });
    if (account == null) {
      res.status(404).json({ message: "Account not found" });
    }
    const alerts = await Alert.findAll({
      where: { account_id: account.account_id, status: "active" },
    });

    res.status(200).json({ alerts: alerts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { sendEmail, sendAlert, createAlert, getAlerts };
