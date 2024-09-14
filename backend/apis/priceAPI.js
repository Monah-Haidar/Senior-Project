import "dotenv/config";

const getPriceFromAPI = async (req, res) => {
  try {
    const url = new URL("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest");
    url.searchParams.set("start", 1);
    url.searchParams.set("limit", 100);
    url.searchParams.set("convert", "USD");

    const response = await fetch(url,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
          Accept: "application/json",
        }
      }
    );

    const data = await response.json();

    function formatNumber(num) {
      if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + ' T';
      } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + ' B';
      } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + ' M';
      } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + ' K';
      } else {
        return num.toString();
      }
    }

    const filteredData = data.data.map(coin => ({
      rank: coin.cmc_rank,
      name: coin.name,
      symbol: coin.symbol,
      price: parseFloat(coin.quote.USD.price.toFixed(2)),
      volume24h: formatNumber(coin.quote.USD.volume_24h.toFixed(2)),
      volumeChange24h: parseFloat(coin.quote.USD.volume_change_24h.toFixed(2)),
      percentChange1h: parseFloat(coin.quote.USD.percent_change_1h.toFixed(2)),
      percentChange24h: parseFloat(coin.quote.USD.percent_change_24h.toFixed(2)),
      percentChange7d: parseFloat(coin.quote.USD.percent_change_7d.toFixed(2)),
      marketCap: formatNumber(coin.quote.USD.market_cap),
      circulatingSupply: formatNumber(coin.circulating_supply),
      totalSupply: formatNumber(coin.total_supply),
    }));

    //res.status(200).json(filteredData);
    //console.log(filteredData);
    return [...filteredData];

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getPriceFromAPI;
