import { Sequelize, DataTypes } from "sequelize";
import sequelize from './config.js';


// user schema
const Instrument = sequelize.define("Instrument", {
  instrument_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.CHAR(3),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instrument_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// exports
export default Instrument;
