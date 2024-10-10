import { useEffect, useState } from "react";
import InstrumentCard from "./instrumentCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AllInstruments() {
  const [marketData, setMarketData] = useState([]);
  const [watchlistData, setWatchlistData] = useState([]);

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axiosPrivate.get("/api/price/watchlist");
        const response = await axiosPrivate.get("/api/price");
        // console.log("Instrument Data:", response.data.prices);
        const sortByRank = response.data.prices.sort((a, b) => a.rank - b.rank);
        setAccountId(response.data.account_id);
        setMarketData(sortByRank);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    const fetchWatchlistData = async () => {
      try {
        const response = await axiosPrivate.get("/api/price/watchlist");
        // console.log("Watchlist Data:", response.data.watchlist);

        setWatchlistData(response.data.watchlist);
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
    };

    const filterData = async () => {
      marketData.forEach((item) => {
        if (watchlistData.some((watchlistItem) => watchlistItem.instrument_id === item.instrument_id)) {
          // console.log("Item is in watchlist", item);
          return setIsInWatchlist((prev) => [...prev, item]);
        }
      });
    };

   

    fetchData();
    fetchWatchlistData();
    filterData();
  }, []);

  

  return (
    <>
      <tbody>
        {marketData.map((item, index) => (
          <InstrumentCard
            key={index}
            instrument_id={item.instrument_id}
            rank={item.rank}
            name={item.name}
            price={item.price}
            percentChange24h={item.percent_change_24h}
            volumeChange24h={item.volume_change_24h}
            marketCap={item.market_cap}
            circulatingSupply={item.circulating_supply}
            totalSupply={item.total_supply}
            isInWatchlist={watchlistData.some(
              (watchlistItem) =>
                watchlistItem.instrument_id === item.instrument_id,
            )}
          />
        ))}
      </tbody>
    </>
  );
}
export default AllInstruments;
