import { Sequelize } from "sequelize";
import "dotenv/config";
// connect db
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false,
//   }
  
// );


// FOR NOUR

// connect to sqlite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
  });



export default sequelize;