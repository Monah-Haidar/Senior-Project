import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';


import User from './routes/user.js';
import Journal from './routes/journal.js';
import Account from "./routes/account.js";  
import Order from "./routes/order.js";
import Markets from './routes/markets.js';
import News from './routes/news.js';

import { cronJob } from "./cronJob/marketsPrice.js";

const app = express()

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

//cronJob();

// User Routes
app.use('/user', User);

// Trading Journal Routes
app.use('/journal', Journal);

// // Market Price Routes
app.use('/markets', Markets);

app.use('/news', News);
app.use('/account', Account)
app.use('/order', Order)

app.listen(process.env.PORT, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`)
})