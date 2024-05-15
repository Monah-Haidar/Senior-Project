import express from 'express';
import "dotenv/config";
import pool from "../db.js";

const router = express.Router();



/////////// FETCH FROM DB

// router.get('/', async (req,res) =>{
//     try{
//         const dataList = await retrieveNewsData();

//         res.json({data: dataList});
//     }catch (error) {
//         console.error(error);
//         res.json("Server error");
//       }
// })







export default router;