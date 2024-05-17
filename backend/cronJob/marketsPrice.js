import cron from "node-cron";
import Instrument from "../models/instrument.js";
//import { fetchNewsDataFromAPI } from "./apis/newsAPI.js";
//import { saveNewsData } from "./data/saveNewsData.js";
import { getMarketPriceFromAPI } from "../apis/marketsPriceAPI.js";
import { saveMarketPriceData } from '../dataStore/saveMarketPriceData.js';
function cronJob() {
  // Scheduled task to run every 1 minutes
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running fetch every 1 minutes");
   
    try {
      //   const newsDataList = await fetchNewsDataFromAPI();
      //   console.log("News Data fetched:", newsDataList);
      await Instrument.sync();
      const marketsDataList = await getMarketPriceFromAPI();
      console.log("Market Prices Data fetched:", marketsDataList);

      if (marketsDataList.length > 0) {
        await saveMarketPriceData(marketsDataList);
        console.log("Data processing completed successfully.");
      } else {
        console.log("No data to process or fetch failed.");
      }
    } catch (error) {
      console.error("Failed during scheduled task:", error);
    }
  });
}
export { cronJob };
