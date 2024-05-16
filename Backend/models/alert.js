import { Sequelize, DataTypes } from "sequelize";
import Account from "./account.js";
import Instrument from "./instrument.js";
import sequelize from './config.js';

// user schema
const Alert = sequelize.define("Alert", {
  alert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  alert_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  threshold: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_triggered: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

Alert.belongsTo(Account, {through:"account_id"})
Alert.belongsToMany(Instrument, {through: "instrument_id"})

// exports
export default Alert;
