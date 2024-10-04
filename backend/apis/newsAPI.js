import "dotenv/config";
const getNewsFromAPI = async (req, res) => {
  try {
    //const [cryptoResponse1, cryptoResponse2, forexResponse1, forexResponse2] =
    const [cryptoResponse1, cryptoResponse2] = await Promise.all([
      fetch(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CryptoPanic_KEY}&public=true`
      ),

      fetch(`https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk`, {
        headers: {
          "X-RapidAPI-Key": process.env.Rapidapi_KEY,
          "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
        },
      }),

      // // Subscription based API - stopped after senior project
      // fetch(`https://forexnewsapi.com/api/v1/category?section=general&items=1&page=1&token=${process.env.FX_KEY}`),
      // fetch(`https://forexnewsapi.com/api/v1?currencypair=EUR-USD,GBP-USD&items=1&page=1&token=${process.env.FX_KEY}`),
    ]);

    const cryptoData1 = await cryptoResponse1.json();
    const cryptoData2 = await cryptoResponse2.json();

    // cryptopanic api
    const cryptoFilteredData1 = cryptoData1.results.map((news) => ({
      title: news.title,
      publication_time: news.published_at,
      source_name: news.domain,
      news_url: news.url,
      related_instruments: news.currencies
        ? news.currencies.map((currency) => currency.title).join(", ")
        : null,
      img_url: null,
      sentiment: null,
      category: "crypto",
    }));

    // coindesk - rapidapi
    const cryptoFilteredData2 = cryptoData2.data.map((news) => ({
      title: news.title,
      publication_time: news.createdAt,
      source_name: "coindesk",
      news_url: news.url,
      related_instruments: null,
      img_url: news.thumbnail,
      sentiment: null,
      category: "crypto",
    }));

    /*
    // forexnewsapi
    const forexFilteredData1 = forexResponse1.data.data.map((news) => ({
      title: news.title,
      publication_time: news.date,
      source_name: news.source_name,
      news_url: news.news_url,
      related_instruments: news.currency ? news.currency.join(", ") : null,
      img_url: news.image_url,
      sentiment: news.sentiment,
      category: determineCategory(news),
    }));

    // forexnewsapi
    const forexFilteredData2 = forexResponse2.data.data.map((news) => ({
      title: news.title,
      publication_time: news.date,
      source_name: news.source_name,
      news_url: news.news_url,
      related_instruments: news.currency ? news.currency.join(", ") : null,
      img_url: news.image_url,
      sentiment: news.sentiment,
      category: determineCategory(news),
    }));
    */

    // determine category of news articles fetched from the forex api
    function determineCategory(news) {
      // Check for specific financial topics
      if (news.currency) {
        return "forex";
      }
      if (news.topics) {
        // Define the economic keywords
        const economicKeywords = [
          "cpi",
          "ppi",
          "oil",
          "natural gas",
          "unemployment",
          "home sales",
        ];
        // Check for 'gold'
        if (news.topics.includes("gold")) {
          return "gold";
        }
        // Check for economic keywords
        if (
          news.topics.some((topic) =>
            economicKeywords.includes(topic.toLowerCase())
          )
        ) {
          return "economy";
        }
      }
      return "general";
    }

    const data = [
      ...cryptoFilteredData1,
      ...cryptoFilteredData2,
      // ...forexFilteredData1,
      // ...forexFilteredData2
    ];

    //res.status(200).json(data);
    // console.log(data[0]);
    return data;

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getNewsFromAPI;
