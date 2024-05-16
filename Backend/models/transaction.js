import { Sequelize, DataTypes } from "sequelize";
import User from "./user.js";
import Account from "./account.js";
import Instrument from "./instrument.js";
import sequelize from './config.js';

// user schema
const Transaction = sequelize.define("Transaction", {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue:0
  },
  timestamp:{
    type:DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status:{
    type:DataTypes.STRING,
  },
  type:{
    type:DataTypes.STRING
  },
  payment_method:{
    type:DataTypes.STRING
  },
});

Transaction.belongsToMany(Account,{through:"account_id"})
Transaction.belongsToMany(Instrument, {through:"instrument_id"})

// Instrument symbol

// exports
export default Transaction;
