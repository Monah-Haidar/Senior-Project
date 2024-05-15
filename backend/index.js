import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

import pool from "./src/db.js";
import { setUpCronJob } from "./src/services/cronService.js";

import journalRoutes from './src/routes/journalRoutes.js';
import marketsRoutes from './src/routes/marketsRoutes.js';
import newsRoutes from './src/routes/newsRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// setUpCronJob();


// Markets Routes
app.use("/markets", marketsRoutes);

// Trading journal routes
app.use('/journals', journalRoutes);

// News Routes - Fetch data from database
// app.use('/news', newsRoutes);


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});






