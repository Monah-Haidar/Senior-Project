import { Sequelize, DataTypes } from "sequelize";
import sequelize from './config.js';
import Order from "./order.js";


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
    defaultValue:"Future"
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
Account.hasMany(Order, {foreignKey:"account_id"})
// exports
export default Account;
