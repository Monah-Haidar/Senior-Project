import { useEffect, useState } from "react";
import InstrumentCard from "./instrumentCard";
// import axios from 'axios'

function AllInstruments() {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3500/api/price");
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchData();
  }, []);

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
export default AllInstruments;
