import { Sequelize, DataTypes } from "sequelize";
import sequelize from './config.js';


// user schema
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
    type: DataTypes.CHAR(3),
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  instrument_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  percentChange24h: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  volumeChange24h: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  marketCap: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  circulatingSupply: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_supply: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

});


// exports
export default Instrument;
