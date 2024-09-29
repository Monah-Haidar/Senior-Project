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
        console.log("Favorate Instrument Data:", response.data);
        setMarketData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

  // // Filter the marketData based on localStorage
  // const filteredMarketData = marketData.filter((item) => {
  //   return localStorage.getItem(item.name) === "true";
  // });

  return (
    <>
      <div>
        {marketData.map((item, index) => (
          <InstrumentCard
          key={index}
          rank={item.rank}
          name={item.name}
          price={item.price}
          percentChange24h={item.percent_change_24h}
          volumeChange24h={item.volume_change_24h}
          marketCap={item.market_cap}
          circulatingSupply={item.circulating_supply}
          totalSupply={item.total_supply}
          />
        ))}
      </div>
    </>
  );
}
export default FavouriteInstruments;
