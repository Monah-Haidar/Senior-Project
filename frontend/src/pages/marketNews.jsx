import NewsCard from "../components/news/newsCard";
import { useState, useEffect } from "react";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

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
        console.log(data);
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
    <div className="mx-6">
      <div className="mt-8 flex flex-col">
        <h1 className="text-center text-7xl font-bold text-base-content">
          News
        </h1>
        <h3 className="mt-5 flex flex-row justify-center text-2xl font-semibold">
          Don't miss a trick with global real-time updates
        </h3>
      </div>

      <div className="mx-auto my-8 flex w-10/12 flex-col gap-12">
        <div className="flex flex-col gap-4">
          {/* World News */}
          <h2 className="text-xl font-semibold">World News</h2>
          <div className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2 2xl:grid-cols-4">
            {worldNews.length > 0 ? (
              worldNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source_name}
                  url={item.news_url}
                  dateUploaded={item.publication_time}
                  img={item.img_url}
                  alt={"image"}
                />
              ))
            ) : (
              <p>Loading world news...</p>
            )}
          </div>
        </div>

        {/* Gold News */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Gold News</h2>
          <div className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2 2xl:grid-cols-4">
            {goldNews.length > 0 ? (
              goldNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source_name}
                  url={item.news_url}
                  dateUploaded={item.publication_time}
                  img={item.img_url}
                  alt={"image"}
                />
              ))
            ) : (
              <p>Loading gold news...</p>
            )}
          </div>
        </div>

        {/* Crypto News */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Crypto News</h2>
          <div className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2 2xl:grid-cols-4">
            {cryptoNews.length > 0 ? (
              cryptoNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source_name}
                  url={item.news_url}
                  dateUploaded={item.publication_time}
                  img={item.img_url}
                  alt={"image"}
                />
              ))
            ) : (
              <p>Loading market news...</p>
            )}
          </div>
        </div>

        {/* Forex News*/}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Forex News</h2>
          <div className="grid grid-cols-1 gap-x-14 gap-y-4 lg:grid-cols-2 2xl:grid-cols-4">
            {forexNews.length > 0 ? (
              forexNews.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  body={item.body}
                  newsSource={item.source_name}
                  url={item.news_url}
                  dateUploaded={item.publication_time}
                  img={item.img_url}
                  alt={"image"}
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
