import { Sequelize, DataTypes } from "sequelize";

// connect to sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

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
