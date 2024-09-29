import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Account = sequelize.define("Account", {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_type: {
    type: DataTypes.ENUM,
    values: ["Futures"],
    allowNull: false,
    defaultValue: "Futures",
  },
  total_balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  base_currency: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    defaultValue: "USD",
  },
});

export default Account;
