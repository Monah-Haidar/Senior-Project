import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Instrument = sequelize.define("Instrument", {
  instrument_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.CHAR(5),
    unique: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  volume_24h: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  volume_change_24h: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  percent_change_1h: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  percent_change_24h: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  percent_change_7d: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  market_cap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  circulating_supply: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_supply: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Instrument;
