import { Sequelize, DataTypes } from "sequelize";
import Account from "./account.js";
import Instrument from "./instrument.js";
import sequelize from './config.js';

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
    allowNull: false,
    defaultValue:"Open"
  },
  completion_time:{
    type:DataTypes.DATE,
    allowNull: true
  },
  stop_loss_price:{
    type:DataTypes.NUMBER,
    allowNull: true
  },
  take_profit_price:{
    type:DataTypes.NUMBER,
    allowNull:true
  },
  trigger_value:{
    type:DataTypes.NUMBER,
    allowNull:true
  },
  instrument_symbol:{
    type:DataTypes.CHAR(3),
    allowNull: false
  }
});


// TODO foreign to instruments
// exports
export default Order;
