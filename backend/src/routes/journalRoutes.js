import express from "express";
import pool from "../db.js";

const router = express.Router();

// ========================== Journals ================================

// Get all journals
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM journals");
    if (!result.rows[0]) {
      return res.json("Journals not found");
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// may not be used
// router.get("/journals/:journalId", async (req, res) => {
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
router.get("/user/:user_id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
    res.json({
      message: "Journal Created Successfully",
      data: result.rows,
    });
    //res.json("Journal Created Successfully");
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// Updates an existing journal by journal_id
router.put("/:journal_id", async (req, res) => {
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
    res.json({
      message: "Journal Updated Successfully",
      data: result.rows,
    });
    // res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

router.delete("/:journal_id", async (req, res) => {
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

    const deleteResult = await pool.query(
      "DELETE FROM journals WHERE journal_id = $1",
      [journal_id]
    );

    if (deleteResult.rows.length === 0) {
      res.json("Journal deleted successfully.");
    }
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// ========================== Journal Entires ================================

// retrieve all journal entries
router.get("/journal_entries", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM journal_entries");

    if (!result.rows[0]) {
      return res.json("Journal entires not found");
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// retrieve specific journal entry
router.get("/journal_entries/:entry_id", async (req, res) => {
  const { entry_id } = req.params;

  if (isNaN(parseInt(entry_id))) {
    return res.json("Invalid entry ID");
  }
  try {
    const result = await pool.query(
      "SELECT * FROM journal_entries WHERE entry_id = $1",
      [entry_id]
    );

    if (!result.rows[0]) {
      return res.json("no entires found");
    }

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// Create a journal entry
router.post("/journal_entries", async (req, res) => {
  const {
    journal_id,
    trade_id,
    title,
    content,
    market_conditions,
    mood,
    img,
    entry_date,
  } = req.body;

  if (!journal_id || !trade_id || !title) {
    return res.json(
      "Missing required fields: user_id and title must be provided."
    );
  }

  try {
    const result = await pool.query(
      "INSERT INTO journal_entries(journal_id, trade_id, title, content, market_conditions, mood, img, entry_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        journal_id,
        trade_id,
        title,
        content,
        market_conditions,
        mood,
        img,
        entry_date || new Date(),
      ]
    );

    res.json({
      message: "Journal Entry created Successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// update journal entries
router.put("/journal_entries/:entry_id", async (req, res) => {
  const { entry_id } = req.params;
  const { title, content, market_conditions, mood, img, entry_date } = req.body;

  if (isNaN(parseInt(entry_id))) {
    return res.json("Invalid entry ID");
  }

  try {
    if (
      !title &&
      !content &&
      !market_conditions &&
      !mood &&
      !img &&
      !entry_date
    ) {
      return res.json("No update fields provided.");
    }

    const fields = [];
    const values = [];

    if (title) {
      fields.push("title = $" + (fields.length + 1));
      values.push(title);
    }
    if (content) {
      fields.push("content = $" + (fields.length + 1));
      values.push(content);
    }
    if (market_conditions) {
      fields.push("market_conditions = $" + (fields.length + 1));
      values.push(market_conditions);
    }
    if (mood) {
      fields.push("mood = $" + (fields.length + 1));
      values.push(mood);
    }
    if (img) {
      fields.push("img = $" + (fields.length + 1));
      values.push(img);
    }
    if (entry_date) {
      fields.push("entry_date = $" + (fields.length + 1));
      values.push(entry_date);
    }

    if (fields.length === 0) {
      return res.json("No valid fields provided for update.");
    }

    values.push(entry_id);

    const queryString = `UPDATE journal_entries SET ${fields.join(
      ", "
    )} WHERE entry_id = $${fields.length + 1} RETURNING *;`;
    console.log(queryString);
    console.log("values", values);
    const result = await pool.query(queryString, values);

    if (result.rows.length === 0) {
      return res.json("Journal entries not found or no change made.");
    }
    res.json({
      message: "Journal Entry Updated Successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

// Delete an entry
router.delete("/journal_entries/:entry_id", async (req, res) => {
  const { entry_id } = req.params;

  if (isNaN(parseInt(entry_id))) {
    return res.json("Invalid entry ID");
  }

  try {
    const checkResult = await pool.query(
      "SELECT * FROM journal_entries WHERE entry_id =$1",
      [entry_id]
    );

    if (checkResult.rows.length === 0) {
      return res.json("Entry ID not isn't present");
    }
    const deleteResult = await pool.query(
      "DELETE FROM journal_entries WHERE entry_id = $1",
      [entry_id]
    );

    if (deleteResult.rows.length === 0) {
      res.json("Journal entry deleted successfully.");
    }
  } catch (error) {
    console.error(error);
    res.json("Server error");
  }
});

export default router;
