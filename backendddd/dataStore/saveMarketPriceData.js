// import pool from "../../db.js";

// // Function to save new data to the database
// async function saveMarketPriceData(dataList) {
//   console.log("Received data for saving");
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");

//     for (const data of dataList) {
//       const res = await client.query(
//         "SELECT * FROM instruments WHERE instrument_id = $1 AND symbol = $2",
//         [data.instrument_id, data.symbol]
//       );
//       console.log("Query executed. Rows found:", res.rows.length);

//       if (res.rows.length === 0) {
//         // If no existing record, insert new data
//         await client.query(
//           "INSERT INTO market_news (title, content, related_instruments, publication_time, source, img, sentiment, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
//           [
//             data.title,
//             data.content,
//             data.related_instruments,
//             data.publication_time,
//             data.source,
//             data.img,
//             data.sentiment,
//             data.category,
//           ]
//         );
//         console.log("New data inserted.");
//       } else {
//         console.log("Data already exists, no insertion needed.");
//       }
//     }
//     await client.query("COMMIT");
//     console.log("Transaction committed successfully.");
//   } catch (error) {
//     console.error("Failed to save data:", error);
//     await client.query("ROLLBACK");
//     throw error;
//   } finally {
//     client.release();
//   }
// }







// export { saveMarketPriceData };
