import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const JournalEntrie = sequelize.define("JournalEntrie", {
  entry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  trade_result: {
    type: DataTypes.ENUM,
    values: ["Winner", "Loser", "Break Even"],
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reasoning: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entry_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  mood: {
    type: DataTypes.ENUM,
    values: [
      "Confident",
      "Anxious",
      "Excited",
      "Fearful",
      "Cautious",
      "Frustrated",
      "Optimistic",
      "Doubtful",
      "Calm",
      "Impatient",
    ],
    allowNull: false,
  },
  market_conditions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  self_reflection: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default JournalEntrie;
