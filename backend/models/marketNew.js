import { Sequelize, DataTypes } from "sequelize";
import Instrument from "./instrument.js";
import sequelize from './config.js';

// user schema
const MarketNew = sequelize.define("MarketNew", {
  news_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publication_time:{
    type:DataTypes.DATE,
    allowNull:true
  },
  source:{
    type:DataTypes.STRING,
    allowNull:true
  },
  img:{
    type:DataTypes.STRING,
    allowNull:true
  }
});

MarketNew.belongsTo(Instrument, {foreignKey:"instrument_id"})
// exports
export default MarketNew;
