import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Transaction = sequelize.define("Transaction", {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["Success", "Failed"],
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM,
    values: ["Deposit", "Withdrawal"],
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM,
    values: ["Bank Transfer", "Credit Card", "Paypal", "Stripe"],
    allowNull: false,
  },
});

export default Transaction;
