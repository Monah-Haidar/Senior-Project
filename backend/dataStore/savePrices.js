import Instrument from "../models/instrument.js";

const savePriceData = async (tokens) => {
  try {
    await Instrument.sync();

    for (const token of tokens) {
      await Instrument.upsert({
        rank: token.rank,
        name: token.name,
        symbol: token.symbol,
        price: token.price,
        volume_24h: token.volume24h,
        volume_change_24h: token.volumeChange24h,
        percent_change_1h: token.percentChange1h,
        percent_change_24h: token.percentChange24h,
        percent_change_7d: token.percentChange7d,
        market_cap: token.marketCap,
        circulating_supply: token.circulatingSupply,
        total_supply: token.totalSupply,
      });
    }

    console.log("Prices saved successfully");
    
  } catch (err) {
    console.error(err);
  }
};

export default savePriceData;
