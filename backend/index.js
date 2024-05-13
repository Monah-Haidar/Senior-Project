import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;
import cron from "node-cron";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to fetch data from the API
async function fetchDataFromAPI() {
  try {
    console.log("Fetching data from API...");
    const [service1Response, service2Response] = await Promise.all([
      axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CryptoPanic_KEY}&public=true`),
      axios.get(`https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk`, {
        headers: {
          "X-RapidAPI-Key": process.env.Rapidapi_KEY,
          "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
        }
      })
    ]);

    const serviceFilteredData1 = service1Response.data.results.map((news) => ({
      title: news.title,
      publication_time: news.published_at,
      source: news.domain,
      content: news.url,
      related_instruments: news.currencies ? news.currencies.map(currency => currency.title).join(', ') : null,
      img: null
    }));

    const serviceFilteredData2 = service2Response.data.data.map((news) => ({
      title: news.title,
      publication_time: news.createdAt,
      source: 'coindesk',
      content: news.url,
      related_instruments: null,
      img: news.thumbnail
    }));

    console.log("Data fetched");
    return serviceFilteredData1.concat(serviceFilteredData2);


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

// Function to save new data to the database
async function saveNewData(dataList) {
  console.log("Received data for saving");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const data of dataList) {
      const res = await client.query(
        "SELECT * FROM market_news WHERE title = $1 AND publication_time = $2 AND source = $3",
        [data.title, data.publication_time, data.source]
      );
      console.log("Query executed. Rows found:", res.rows.length);

      if (res.rows.length === 0) {
        // If no existing record, insert new data
        await client.query(
          "INSERT INTO market_news (title, content, related_instruments, publication_time, source, img) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            data.title,
            data.content,
            data.related_instruments,
            data.publication_time,
            data.source,
            data.img
          ]
        );
        console.log("New data inserted.");
      } else {
        console.log("Data already exists, no insertion needed.");
      }
    }
    await client.query("COMMIT");
    console.log("Transaction committed successfully.");
  } catch (error) {
    console.error("Failed to save data:", error);
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Scheduled task to run every 1 minutes
cron.schedule("*/1 * * * *", async () => {
  console.log("Running fetch every 1 minutes");

  try{
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






app.get("/", (req, res) => {
  console.log("Hello world");
});

app.get("/markets", async (req, res) => {
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

    res.json(filteredData);
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
});

// app.get("/news", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CryptoPanic_KEY}&public=true`
//     );

//     const filteredData = response.data.results.map((news) => ({
//         title: news.title,
//         publicationDate: news.published_at,
//         source: news.domain,
//         content: news.url,
//         // relatedInstruments:
//     }))

//     // res.json(response.data);
//     res.json(filteredData);
//   } catch {
//     if (error.response) {
//       // Request made and server responded
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//       res.status(error.response.status).send(error.response.data);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.log(error.request);
//       res.status(504).send("The request was made but no response was received");
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//       res.status(500).send(error.message);
//     }
//   }
// });

app.get("/news", async (req, res) => {
  try {
    const data = await fetchDataFromAPI();

    // res.json(response.data);
    res.json(data);
  } catch {
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
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
