import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

import pool from "./src/db.js";
import { setUpCronJob } from "./src/services/cronService.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// setUpCronJob();

app.get("/markets", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
          Accept: "application/json",
        },
        params: {
          start: 1,
          limit: 3,
          convert: "USD",
        },
      }
    );

    const filteredData = response.data.data.map((coin) => ({
      rank: coin.cmc_rank,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.quote.USD.price,
      percentChange24h: coin.quote.USD.percent_change_24h,
      volumeChange24h: coin.quote.USD.volume_change_24h,
      marketCap: coin.quote.USD.market_cap,
      circulatingSupply: coin.circulating_supply,
    }));

    res.json(filteredData);
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      res.status(504).send("The request was made but no response was received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      res.status(500).send(error.message);
    }
  }
});

// ========================== Journals ================================

// Get all journals
app.get("/journals", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM journals");

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// may not be used
// app.get("/journals/:journalId", async (req, res) => {
//   const { journalId } = req.params;

//   if (isNaN(parseInt(journalId))) {
//     return res.json("Invalid journal ID");
//   }

//   try {
//     const result = await pool.query(
//       "SELECT * FROM journals WHERE journal_id = $1",
//       [journalId]
//     );

//     if (!result.rows[0]) {
//       return res.json("Journal not found");

//     }

//     res.json(result.rows);

//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error retrieving the journal from the database" });
//   }
// });

// Get all jounals for a specific user
app.get("/journals/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    if (isNaN(parseInt(user_id))) {
      return res.json("Invalid user ID");
    }

    const result = await pool.query(
      "SELECT * FROM journals WHERE journals.user_id= $1",
      [user_id]
    );

    if (!result.rows[0]) {
      return res.json("User has no journals");
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new Journal
app.post("/journals/", async (req, res) => {
  const { user_id, title, description, creation_date, last_updated } = req.body;

  if (!user_id || !title) {
    return res.json(
      "Missing required fields: user_id and title must be provided."
    );
  }
  try {
    console.log("Executing query");
    const result = await pool.query(
      "INSERT INTO journals(user_id, title, description, creation_date, last_updated) VALUES($1, $2, $3, $4, $5)",
      [
        user_id,
        title,
        description,
        creation_date || new Date(),
        last_updated || new Date(),
      ]
    );
    console.log(" query finished");

    res.json("Journal Added Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Updates an existing journal by journal_id
app.put("/journals/:journal_id", async (req, res) => {
  const { journal_id } = req.params;
  const { title, description, last_updated } = req.body;

  // Validate journalId as a valid number
  if (isNaN(parseInt(journal_id))) {
    return res.json("Invalid journal ID");
  }

  // Validate that at least one field is provided for update
  if (!title && !description && !last_updated) {
    return res.json(
      "No update fields provided. Please provide title, description, or last_updated."
    );
  }

  try {
    const fields = [];
    const values = [];

    if (title) {
      fields.push("title = $" + (fields.length + 1));
      values.push(title);
    }
    if (description) {
      fields.push("description = $" + (fields.length + 1));
      values.push(description);
    }
    if (last_updated) {
      fields.push("last_updated = $" + (fields.length + 1));
      values.push(last_updated);
    }

    // Avoid SQL query execution if no valid fields are provided
    if (fields.length === 0) {
      return res.json("No valid fields provided for update.");
    }

    values.push(journal_id);

    const queryString = `UPDATE journals SET ${fields.join(
      ", "
    )} WHERE journal_id = $${fields.length + 1} RETURNING *;`;
    console.log(queryString);
    console.log(values);

    const result = await pool.query(queryString, values);

    if (result.rows.length === 0) {
      return res.json("Journal not found or no change made.");
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/journals/:journal_id", async (req, res) => {
  const { journal_id } = req.params;

  // Validate journalId as a valid number
  if (isNaN(parseInt(journal_id))) {
    return res.json("Invalid journal ID");
  }

  try {
    const checkResult = await pool.query(
      "SELECT * FROM journals WHERE journal_id = $1",
      [journal_id]
    );
    if (checkResult.rows.length === 0) {
      return res.json("Journal not found.");
    }

    const deleteResult = await pool.query('DELETE FROM journals WHERE journal_id = $1', [journal_id]);

    if (deleteResult.rows.length === 0){
      res.json('Journal deleted successfully.');
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================== Journal Entires ================================

// retrieve journal entries for a user
app.get("/api/journal_entries/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT journal_entries.*, trades.*, orders.* FROM journal_entries LEFT JOIN trades ON journal_entries.trade_id = trades.trade_id LEFT JOIN orders ON trades.order_id = orders.order_id WHERE journal_entries.user_id = $1",
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a journal entry
app.post("/api/journal_entries", async (req, res) => {
  const {
    user_id,
    trade_id,
    title,
    content,
    entry_date,
    mood,
    market_conditions,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO journal_entries (user_id, trade_id, title, content, entry_date, mood, market_conditions) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [user_id, trade_id, title, content, entry_date, mood, market_conditions]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update journal entries for a user
app.put("/api/journal_entries/:entryId", async (req, res) => {
  const { entryId } = req.params;
  const { title, content, mood, market_conditions } = req.body;
  try {
    const result = await pool.query(
      "UPDATE journal_entries SET title = $1, content = $2, mood = $3, market_conditions = $4 WHERE entry_id = $5 RETURNING *",
      [title, content, mood, market_conditions, entryId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an entry
app.delete("/api/journal_entries/:entryId", async (req, res) => {
  const { entryId } = req.params;
  try {
    await pool.query("DELETE FROM journal_entries WHERE entry_id = $1", [
      entryId,
    ]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
