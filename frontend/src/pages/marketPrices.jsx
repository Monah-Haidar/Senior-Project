import { useState } from "react";

import AllInstruments from "../components/markets/allInstruments";
import FavouriteInstruments from "../components/markets/favourateInstruments";

function MarketPrices() {
  const [activeTab,setActiveTab] = useState(1);

  const [isActive, setIsActive] = useState(1);

  function handleMarketTabsFiltersClick(index) {
    setIsActive(index);
    setActiveTab(index);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-6">
          {/* Markets Overview Heading */}
          <h1 className="text-3xl font-display font-semibold text-base-content mt-8">
            Markets Overview
          </h1>

          {/* Market Tabs Button Filters */}
          <div className="flex flex-row gap-x-6 font-display font-semibold  text-base mb-6">
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

          {/* Market Table Heading */}
          <div className="flex flex-row justify-between items-center text-xs text-[#797A7B] font-medium h-9 px-4 -mx-4 rounded-xl">
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
          </div>

          {/* Display Instruments */}
          {activeTab === 0 ? <FavouriteInstruments /> : <AllInstruments />}
        </div>
      </div>
    </>
  );
}

export default MarketPrices;
