import "dotenv/config";
import express from "express";
import sequelize from "./models/config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import priceAPI from "./routes/priceRoute.js";
import newsAPI from "./routes/newsRoute.js";
import articles from "./routes/articlesRoute.js";
import journalEntries from "./routes/journalRoute.js";
import transactions from "./routes/transactionsRoute.js";
import alerts from "./routes/alertsRoute.js";
import users from "./routes/usersRoute.js";
import orders from "./routes/ordersRoute.js";

import cronJobAPI from "./cronJobs/cronJobAPI.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Test DB Connection
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync({force: false});
} catch (error) {
  console.error("Unable to connect to the database:", error);
} 


// Cron Job
// console.log("Running fetch every 1 minutes");
// cronJobAPI();


// Routes
app.use("/api/price", priceAPI);
app.use("/api/news", newsAPI);
app.use("/articles", articles);
app.use("/journalEntries", journalEntries);
app.use("/user", users);
app.use("/order", orders);

app.use("/transactions", transactions);
app.use("/alerts", alerts);


app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
