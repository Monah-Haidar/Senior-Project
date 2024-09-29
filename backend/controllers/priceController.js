import Instrument from "../models/instrument.js";

const getAllPrices = async (req, res) => {
  try {
    // await Instrument.sync({force: true});

    const dataList = await Instrument.findAll({ order: [["rank", "ASC"]] });
    // console.log(dataList);
    return res.json(dataList);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllPrices;
