import { Sequelize, DataTypes } from "sequelize";
import User from "./user.js";
import sequelize from './config.js';

// user schema
const Journal = sequelize.define("Journal", {
  journal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Journal.belongsTo(User, {foreignKey:"user_id"})

// exports
export default Journal;
