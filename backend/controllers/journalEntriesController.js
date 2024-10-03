import JournalEntrie from "../models/journalEntrie.js";

const createEntry = async (req, res) => {
  try {
    console.log("body", req.body);

    await JournalEntrie.sync();

    const user_id = req.user_id;

    const {
      title,
      reasoning,
      entry_date,
      mood,
      market_conditions,
      self_reflection,
      img,
    } = req.body;

    const journalEntry = await JournalEntrie.create({
      title,
      reasoning,
      entry_date,
      mood,
      market_conditions,
      self_reflection,
      img,
      user_id: user_id,
    });

    return res.status(200).json({
      message: "Journal Entry Created Successfully",
      data: journalEntry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllEntries = async (req, res) => {
  try {
    // await JournalEntrie.sync();

    const journal_entry = await JournalEntrie.findAll();

    if (!journal_entry) {
      return res.status(404).json({ message: "Journal Entry not found" });
    }

    return res.status(200).json({
      status: "Journal Entry Retrieved Successfully",
      data: journal_entry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const updateEntry = async (req, res) => {
  try {
    // await JournalEntrie.sync();

    const journal_entry_id = req.params.id;

    const {
      title,
      reasoning,
      entry_date,
      mood,
      market_conditions,
      img,
      self_reflection,
    } = req.body;

    const journal_entry = await JournalEntrie.findByPk(journal_entry_id);

    if (!journal_entry) {
      return res.status(404).json({ message: "Journal Entry Not Found" });
    }

    const updated_entry = await JournalEntrie.update(
      {
        title: title,
        reasoning: reasoning,
        entry_date: entry_date,
        mood: mood,
        market_conditions: market_conditions,
        img: img,
        self_reflection: self_reflection,
      },
      {
        where: {
          entry_id: journal_entry_id,
        },
      }
    );

    return res.status(200).json({
      status: "Journal Entry Updated Successfully",
      data: journal_entry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEntry = async (req, res) => {
  try {
    // await JournalEntrie.sync();

    const journal_entry_id = req.params.id;

    const journal_entry = await JournalEntrie.findByPk(journal_entry_id);

    if (!journal_entry) {
      return res.status(404).json({ message: "Journal Entry not found" });
    }

    await journal_entry.destroy();

    return res.status(200).json({ message: "Journal Entry Deleted" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createEntry, getAllEntries, updateEntry, deleteEntry };
