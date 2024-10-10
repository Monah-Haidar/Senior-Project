import { useEffect, useState } from "react";
import InstrumentCard from "./instrumentCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function FavouriteInstruments() {
  const [marketData, setMarketData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/api/price/watchlist");

        const instrumentRanks = response.data.watchlist.map(
          (item) => item.Instrument,
        );
        const sortByRank = instrumentRanks.sort((a, b) => a.rank - b.rank);

        setMarketData(sortByRank);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
            isInWatchlist={true}
          />
        ))}
      </tbody>
    </>
  );
}
export default FavouriteInstruments;
