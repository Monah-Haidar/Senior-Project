import cron from "node-cron";

import saveNewsData from "../dataStore/saveNews.js";
import getNewsFromAPI from "../apis/newsAPI.js";

import savePriceData from "../dataStore/savePrices.js";
import getPriceFromAPI from "../apis/priceAPI.js";

function cronJobAPI() {
  
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running fetch every 1 minutes");
    try {
      const priceData = await getPriceFromAPI();
      await savePriceData(priceData);

      // const newsData = await getNewsFromAPI();
      // await saveNewsData(newsData);
      console.log("Successfully fetched and saved data");
    } catch (error) {
      console.error("Failed during scheduled task:", error);
    }
  });
}
export default cronJobAPI;
