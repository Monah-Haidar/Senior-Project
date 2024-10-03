import { useEffect, useState } from "react";
import InstrumentCard from "./instrumentCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function AllInstruments() {
  const [marketData, setMarketData] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axiosPrivate.get("/api/price/watchlist");
        const response = await axiosPrivate.get("/api/price");
        // console.log("Instrument Data:", response.data);

        setAccountId(response.data.account_id);
        setMarketData(response.data.prices);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  const watchlistData = marketData.filter((marketData) => {
    return marketData.watchlist_id === accountId;
  });
  // console.log("Watchlist Data:", watchlistData);

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
                watchlistItem.instrument_id === item.instrument_id
            )}
          />
        ))}
        </tbody>
    
    </>
  );
}
export default AllInstruments;
