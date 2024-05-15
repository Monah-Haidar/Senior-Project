import cron from "node-cron";

import { fetchNewsDataFromAPI } from "./apis/newsAPI.js";
import { getMarketPriceAPI } from "./apis/marketPricesAPI.js";
import { saveNewsData } from "./data/saveNewsData.js";
import { saveMarketPriceData } from "./data/saveMarketPriceData.js";

function setUpCronJob() {
  // Scheduled task to run every 1 minutes
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running fetch every 1 minutes");

    try {
      const newsDataList = await fetchNewsDataFromAPI();
      console.log("News Data fetched:", newsDataList);

      const marketsDataList = await getMarketPriceAPI();
      console.log("Market Prices Data fetched:", marketsDataList);


      if (newsDataList.length > 0) {
        await saveNewsData(newsDataList);
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
export { setUpCronJob };