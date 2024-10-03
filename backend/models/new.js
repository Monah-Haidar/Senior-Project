import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const New = sequelize.define("New", {
  news_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  source_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  related_instruments: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sentiment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  publication_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  news_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default New;
