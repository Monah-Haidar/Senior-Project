import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

// get forex and market prices

async function getMarketPriceAPI(req, res) {
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

    return [filteredData];
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
}

export { getMarketPriceAPI };
