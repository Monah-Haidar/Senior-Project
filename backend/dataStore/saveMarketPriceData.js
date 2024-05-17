import Instrument from "../models/instrument.js";

// Function to save new data to the database
const saveMarketPriceData = async (dataList) => {
  try {
    console.log("Received data for saving");
    await Instrument.sync();

    for (const data of dataList) {
        const {name, symbol } = data;
    //   const [instance, created] = await Instrument.upsert(
    //     {
    //       rank: data.rank,
    //       name: data.name,
    //       symbol: data.symbol,
    //       price: data.price,
    //       instrument_type: data.instrumentType,
    //       percentChange24h: data.percentChange24h,
    //       volumeChange24h: data.volumeChange24h,
    //       marketCap: data.marketCap,
    //       circulatingSupply: data.circulatingSupply,
    //       totalSupply: data.totalSupply,
    //     },
    //     {
    //       returning: true, // This will return the updated instance
    //     }
    //   );
        const d = await Instrument.findOne({where:{name, symbol}});

        return d;





      if (created) {
        console.log(`New entry created for symbol: ${data.symbol}`);
      } else {
        console.log(
          `Entry already exists for symbol: ${data.symbol}, no need to insert.`
        );
      }
    }
  } catch (err) {
    console.error(err);
    // res.status(500).json({ message: "Internal Server Error" });
  }
};

export { saveMarketPriceData };
