import { Sequelize, DataTypes } from "sequelize";

// connect to sqlite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

// user schema
const Article = sequelize.define("Article", {
  article_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url:{
    type:DataTypes.STRING,
    allowNull: false
  },
  published_date:{
    type:DataTypes.DATE,
    allowNull:true
  },
  reading_time:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  difficulty:{
    type:DataTypes.STRING,
    allowNull:true
  },
  topic:{
    type:DataTypes.STRING,
    allowNull:true
  },
  img:{
    type:DataTypes.STRING,
    allowNull:true
  }
});


// exports
export default Article;
