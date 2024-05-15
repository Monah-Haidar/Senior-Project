import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';


import User from './routes/user.js';
import Journal from './routes/journal.js';

const app = express()

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


// User Routes
app.use('/user', User);

// Trading Journal Routes
app.use('/journal', Journal);




app.listen(process.env.PORT, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`)
})