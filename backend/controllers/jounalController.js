import Journal from "../models/journal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createJournal = async (req, res) => {
  try {
    await Journal.sync();
    const user_id = req.user_id;
    const {title, description} = req.body;
    const existingJournal = await Journal.findOne({where:{title}});

    if (existingJournal != null){
      return res.status(400).json({message: "Journal Already Exists"});
    }

    const journal = await Journal.create({title, description, user_id});

    return res.status(200).json({message: "Journal Created Successfully", data: journal});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getJournal = async (req, res) => {
  try {





  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllJournals = async (req, res) => {
  try {





  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateJournal = async (req, res) => {
  try {





  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const journal_id = req.params.id;
    const journal = await Journal.findByPk(journal_id);

    if(!journal){
      return res.status(404).json({"message":"Journal not found"});
    }

    await journal.destroy();
    return res.status(200).json({"message":"Journal deleted"})
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createJournal,
  getJournal,
  getAllJournals,
  updateJournal,
  deleteJournal,
};
