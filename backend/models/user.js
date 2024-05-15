import { Sequelize, DataTypes } from "sequelize";
import sequelize from './config.js';

// user schema
const User = sequelize.define('User', {
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    first_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:false 
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    last_login:{
        type:DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    status:{
        type:DataTypes.STRING,
        allowNull: true,
        defaultValue: 'active'
    },
    two_factor_enabled:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    login_alert:{
        type:DataTypes.STRING,
        defaultValue:"",
        allowNull:true
    }
})

// exports
export default User;
