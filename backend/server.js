import "dotenv/config";
import express from "express";
import sequelize from "./models/config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import priceAPI from "./routes/priceRoute.js";
import newsAPI from "./routes/newsRoute.js";
import articles from "./routes/articlesRoute.js";
import journalEntries from "./routes/journalRoute.js";
import transactions from "./routes/transactionsRoute.js";
import alerts from "./routes/alertsRoute.js";
import users from "./routes/usersRoute.js";
import accounts from "./routes/accountsRoute.js";
import orders from "./routes/ordersRoute.js";
import refreshToken from "./routes/refreshRoute.js";

import verifyJWT from "./middleware/verifyJWT.js";

import cronJobAPI from "./cronJobs/cronJobAPI.js";
import cronJobLimitOrder from "./cronJobs/cronJobLimitOrder.js";
import cronJobTakeProfitAndStopLossOrders from "./cronJobs/cronJobTakeProfitAndStopLossOrders.js";

import { setupAssociations } from "./models/associations.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// setup db associations
setupAssociations();

// Test DB Connection
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  await sequelize.sync({alter: false});
} catch (error) {
  console.error("Unable to connect to the database:", error);
} 


// Cron Job

// console.log("Running fetch every 1 minutes...");
// cronJobAPI();
// console.log("Checking pending orders...");
// cronJobLimitOrder();
// cronJobTakeProfitAndStopLossOrders();

// Routes
app.use("/api/price", priceAPI);
app.use("/api/news", newsAPI);
app.use("/articles", articles);
app.use("/refresh", refreshToken);

// not all routes are protected
app.use("/user", users);

app.use(verifyJWT);
// protected routes
app.use("/account", accounts);
app.use("/transaction", transactions);
app.use("/order", orders);
app.use("/alert", alerts);
app.use("/journalEntries", journalEntries);



app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
