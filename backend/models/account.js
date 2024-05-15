import { Sequelize, DataTypes } from "sequelize";
import User from "./user.js";
import sequelize from './config.js';



// user schema
const Account = sequelize.define("Account", {
  account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_balance: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  instrument_symbol:{
    type: DataTypes.CHAR(3),
    allowNull: false
  }
});

// Account.belongsTo(User, { foreignKey: "user_id" });
Account.hasMany(User)

// exports
export default Account;
