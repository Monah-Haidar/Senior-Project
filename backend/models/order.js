import { Sequelize, DataTypes } from "sequelize";
import Account from "./account.js";
import Instrument from "./instrument.js";

// connect to sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

// user schema
const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  entry_price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  order_status:{
    type:DataTypes.STRING,
    allowNull: false
  },
  completion_time:{
    type:DataTypes.DATE,
    allowNull: false
  },
  strop_loss_price:{
    type:DataTypes.NUMBER,
    allowNull: null
  },
  take_profit_price:{
    type:DataTypes.NUMBER,
    allowNull:true
  },
  trigger_value:{
    type:DataTypes.NUMBER,
    allowNull:true
  }

});

Order.belongsTo(Account, {foreignKey: "account_id"});
Order.belongsTo(Instrument, {foreignKey: "instrument_id"});

// TODO foreign to instruments
// exports
export default Order;
