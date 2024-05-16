import axios from "axios";

// Function to fetch news data from the API
const getNewsDataFromAPI = async (req, res) => {
  try {
    console.log("Fetching data from API...");
    const [service1Response, service2Response, forexResponse] =
      await Promise.all([
        axios.get(
          `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CryptoPanic_KEY}&public=true`
        ),
        axios.get(`https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk`, {
          headers: {
            "X-RapidAPI-Key": process.env.Rapidapi_KEY,
            "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
          },
        }),

        axios.get(
          `https://forexnewsapi.com/api/v1/category?section=general&items=3&page=1&token=${process.env.FX_KEY}`
        ),
      ]);

    const serviceFilteredData1 = service1Response.data.results.map((news) => ({
      title: news.title,
      publication_time: news.published_at,
      source: news.domain,
      content: news.url,
      related_instruments: news.currencies
        ? news.currencies.map((currency) => currency.title).join(", ")
        : null,
      img: null,
      sentiment: null,
      category: "crypto",
    }));

    const serviceFilteredData2 = service2Response.data.data.map((news) => ({
      title: news.title,
      publication_time: news.createdAt,
      source: "coindesk",
      content: news.url,
      related_instruments: null,
      img: news.thumbnail,
      sentiment: null,
      category: "crypto",
    }));

    const forexFilteredData = forexResponse.data.data.map((news) => ({
      title: news.title,
      publication_time: news.date,
      source: news.source_name,
      content: news.news_url,
      related_instruments: news.currency
        ? news.currency.map((currency) => currency.title).join(", ")
        : null,
      img: news.image_url,
      sentiment: news.sentiment,
      category: determineCategory(news),
    }));

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
          "Oil",
          "Natural Gas",
          "unemployment",
          "Home Sales",
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

    console.log("Data fetched");
    // return [
    //   ...serviceFilteredData1,
    //   ...serviceFilteredData2,
    //   ...forexFilteredData,
    // ];
    const data = [
        ...serviceFilteredData1,
        ...serviceFilteredData2,
        ...forexFilteredData,
      ];

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getNewsDataFromAPI };