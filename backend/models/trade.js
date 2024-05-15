import { Sequelize, DataTypes } from "sequelize";
import Order from "./order.js";

// connect to sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

// user schema
const Trade = sequelize.define("Trade", {
  trade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  price_executed: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  quantity_executed: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  trade_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  net_amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
});

Trade.belongsTo(Order, { foreignKey: "order_id" });

// exports
export default Trade;
