import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import User from './routes/user.js';

const app = express()

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// routes
app.use('/user', User);

// listen to the server
app.get('/', (req, res)=>{
    res.send("hello")
});




app.listen(process.env.PORT, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT}`)
})