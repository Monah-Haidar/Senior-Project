import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Watchlist = sequelize.define("Watchlist", {
  watchlist_id: {
    type: DataTypes.INTEGER,
    unique: false,
  },
});

export default Watchlist;
