import { DataTypes } from "sequelize";
import sequelize from './config.js';
import Account from "./account.js";

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_type: {
    type: DataTypes.ENUM,
    values: ["Buy", "Sell", "Pending Buy", "Pending Sell"],
    allowNull: false,
  },
  order_status:{
    type:DataTypes.ENUM,
    values: ["Open", "Closed", "Cancelled"],
    allowNull: false,
    defaultValue: "Open"
  },
  instrument_symbol:{
    type:DataTypes.CHAR(3),
    allowNull: false,
    defaultValue: "BTC"
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  entry_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stop_loss_price:{
    type:DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null
  },
  take_profit_price:{
    type:DataTypes.FLOAT,
    allowNull:true,
    defaultValue: null
  },
  pending_order_value:{
    type:DataTypes.FLOAT,
    allowNull:true,
    defaultValue: null
  },
  creation_time:{
    type:DataTypes.DATE,
    allowNull: false
  },
  completion_time:{
    type:DataTypes.DATE,
    allowNull: true
  }
});

Order.belongsTo(Account, { foreignKey: "account_id" });

export default Order;
