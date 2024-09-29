import NewsCard from "../components/news/newsCard";
import { useState, useEffect } from "react";

function MarketNews() {
  const [worldNews, setWorldNews] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);
  const [forexNews, setForexNews] = useState([]);
  const [goldNews, setGoldNews] = useState([]);

  useEffect(() => {
    // fetch World News
    async function fetchWorldNews() {
      try {
        const response = await fetch("http://localhost:3500/api/news/world");
        const data = await response.json();
        setWorldNews(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching world news:", error);
      }
    }

    // fetch Gold News
    async function fetchGoldNews() {
        try {
          const response = await fetch("http://localhost:3500/api/news/gold");
          const data = await response.json();
          setGoldNews(data);
          // console.log(data);
        } catch (error) {
          console.error("Error fetching gold news:", error);
        }
      }

    // fetch Crypto News
    async function fetchCryptoNews() {
      try {
        const response = await fetch("http://localhost:3500/api/news/crypto");
        const data = await response.json();
        setCryptoNews(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching crypto news:", error);
      }
    }
    // fetch Forex News
    async function fetchForexNews() {
      try {
        const response = await fetch("http://localhost:3500/api/news/forex");
        const data = await response.json();
        setForexNews(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching forex news:", error);
      }
    }

    fetchWorldNews();
    fetchGoldNews();
    fetchCryptoNews();
    fetchForexNews();
  }, []);

  return (
    <div className="pt-6 pb-6 flex flex-col items-center">
      {/* News Header Text */}
      <div className="flex flex-col items-center gap-3 mb-16">
        <h1 className="text-3xl font-display">News</h1>
        <h3 className="text-xl font-display">
          Don't miss a trick with global real-time updates
        </h3>
      </div>

      {/* News Sections */}
      <div className="flex w-11/12 gap-12 flex-col items-start justify-center">
        <div className="flex flex-col gap-4">
        {/* World News */}
          <h2>World News</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {worldNews.length > 0 ? (
              worldNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source}
                  url={item.url}
                  dateUploaded={item.dateUploaded}
                  img={item.img}
                  alt={item.alt}
                />
              ))
            ) : (
              <p>Loading world news...</p>
            )}
          </div>
        </div>

        {/* Gold News */}
        <div className="flex flex-col gap-4">
          <h2>Gold News</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {goldNews.length > 0 ? (
              goldNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source}
                  url={item.url}
                  dateUploaded={item.dateUploaded}
                  img={item.img}
                  alt={item.alt}
                />
              ))
            ) : (
              <p>Loading gold news...</p>
            )}
          </div>
        </div>

        {/* Crypto News */}
        <div className="flex flex-col gap-4">
          <h2>Crypto News </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {cryptoNews.length > 0 ? (
              cryptoNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source}
                  url={item.url}
                  dateUploaded={item.dateUploaded}
                  img={item.img}
                  alt={item.alt}
                />
              ))
            ) : (
              <p>Loading market news...</p>
            )}
          </div>
        </div>

        {/* Forex News*/}
        <div className="flex flex-col gap-4">
          <h2>Forex News</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {forexNews.length > 0 ? (
              forexNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source}
                  url={item.url}
                  dateUploaded={item.dateUploaded}
                  img={item.img}
                  alt={item.alt}
                />
              ))
            ) : (
              <p>Loading forex news...</p>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default MarketNews;
