import { DataTypes } from "sequelize";
import sequelize from "./config.js";

const Alert = sequelize.define("Alert", {
  alert_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  threshold: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});


export default Alert;
