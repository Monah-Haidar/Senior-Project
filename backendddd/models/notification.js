import { Sequelize, DataTypes } from "sequelize";
import User from "./user.js";
import sequelize from './config.js';

// user schema
const Notification = sequelize.define("Notification", {
  notificaton_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Notification.belongsTo(User, {foreignKey:"user_id"})

// exports
export default Notification;
