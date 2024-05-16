import { Sequelize, DataTypes } from "sequelize";
import sequelize from './config.js';

// user schema
const JournalEntrie = sequelize.define("JournalEntrie", {
 entry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reasoning: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mood:{
    type:DataTypes.STRING,
    allowNull:false
  },
  market_condition:{
    type:DataTypes.STRING,
    allowNull:false
  },
  img:{
    type:DataTypes.STRING,
    allowNull:true
  },
  self_reflection:{
    type:DataTypes.STRING,
    allowNull:false 
  }
});



// exports
export default JournalEntrie;
