import cron from "node-cron";

import { fetchDataFromAPI } from "./apiService.js";
import { saveNewData } from "./storeData.js";

function setUpCronJob() {
  // Scheduled task to run every 1 minutes
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running fetch every 1 minutes");

    try {
      const dataList = await fetchDataFromAPI();
      console.log("Data fetched:", dataList);

      if (dataList.length > 0) {
        await saveNewData(dataList);
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