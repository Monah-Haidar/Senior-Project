import { useState } from "react";

import AllInstruments from "../components/markets/allInstruments";
import FavouriteInstruments from "../components/markets/favourateInstruments";

function MarketPrices() {
  const [activeTab, setActiveTab] = useState(1);

  const [isActive, setIsActive] = useState(1);

  function handleMarketTabsFiltersClick(index) {
    setIsActive(index);
    setActiveTab(index);
  }

  return (
    <>
      <div className="mx-6">
        {/* Markets Overview Heading */}
        <h1 className="mt-8 text-center text-6xl font-bold text-base-content">
          Markets Overview
        </h1>

        {/* Market Tabs Button Filters */}
        <div className="mt-5 flex flex-row justify-center gap-x-6 text-lg font-semibold">
          <button
            onClick={() => handleMarketTabsFiltersClick(0)}
            className={` ${
              isActive === 0 ? "text-base-content" : "text-[#797A7B]"
            }`}
          >
            Favorites
          </button>

          <button
            onClick={() => handleMarketTabsFiltersClick(1)}
            className={`${
              isActive === 1 ? "text-base-content" : "text-[#797A7B]"
            }`}
          >
            All Cryptos
          </button>
        </div>

        {/* Market Table */}

        <table className="table mx-auto mt-5 max-w-7xl">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h Percent Change</th>
              <th>24hr Volume</th>
              <th>Market Cap</th>
              <th>Circulating Supply</th>
              <th>Total Supply</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Display Instruments */}
          {activeTab === 0 ? <FavouriteInstruments /> : <AllInstruments />}
        </table>
      </div>
    </>
  );
}

export default MarketPrices;

{
  /* Market Table Heading */
}
{
  /* <div className="flex flex-row justify-between items-center text-xs text-[#797A7B] font-medium h-9 px-4 -mx-4 rounded-xl">
            <div className="w-20">Rank</div>

            <div className="w-36">Name</div>

            <div className="flex flex-row items-center text-right h-8 gap-x-4">
              <div className="w-36">Price</div>

              <div className="w-36">24h Percent Change</div>

              <div className="w-36">24hr Volume</div>

              <div className="w-36">Market Cap</div>

              <div className="w-36">Circulating Supply</div>

              <div className="w-36">Total Supply</div>

              <div className="w-36">Action</div>
            </div>
          </div> */
}
