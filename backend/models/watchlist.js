import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Watchlist = sequelize.define("Watchlist", {
  watchlist_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default Watchlist;
