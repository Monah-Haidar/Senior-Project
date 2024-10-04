import { useState } from "react";

import TradingViewWidget from "../components/trade/chart";
import JournalEntryForm from "../components/trade/journalEntryForm";
import AlertForm from "../components/trade/alertForm";
import TradeForm from "../components/trade/tradeForm";
import AutomateForm from "../components/trade/automateForm";

// import BookOpen from "../assets/icons/book-open";
// import Chart from "../assets/icons/chart";
// import BellAlert from "../assets/icons/bell-alert";

import {
  ClockIcon,
  StarIcon,
  CogIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";











// import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

// import PredictForm from "../components/trade/predictForms";

function Trade() {
  const [predictedPrice, setPredictedPrice] = useState("");

  return (
    <div className="flex flex-row">
      <div className="flex h-[90vh] w-[90vw] flex-col overflow-hidden">
        {/* CHART */}
        <div className="flex-1 overflow-hidden">
          <TradingViewWidget />
        </div>
      </div>

      {/* sidebar */}
      <div className="flex w-[10vw] flex-col items-center gap-4 pt-4">
        <div className="flex w-[10vw] flex-col items-center gap-4 pt-4">
          {/* Market Order */}
          <div
            tabIndex={0}
            role="button"
            className="btn dropdown dropdown-left flex w-10/12 flex-row gap-2"
          >
            <div className="flex w-full flex-row items-center gap-2">
            <PresentationChartLineIcon className="h-6 w-6" />
              <h1 className="text-left">Market Order</h1>
            </div>

            <div className="dropdown-content z-[1] mr-24 w-72 rounded-box bg-base-100 p-2 shadow">
              <TradeForm />
            </div>
          </div>

          {/* Limit Order */}
          <div
            tabIndex={0}
            role="button"
            className="btn dropdown dropdown-left flex w-10/12 flex-row gap-2"
          >
            <div className="flex w-full flex-row items-center gap-2">
              <CogIcon className="size-6" />
              <h1 className="text-left">Limit Order</h1>
            </div>
            <div className="dropdown-content z-[1] mr-24 w-72 rounded-box bg-base-100 p-2 shadow">
              <AutomateForm />
            </div>
          </div>

            {/* Journal Button with Dropdown */}
            <div
            tabIndex={0}
            role="button"
            className="btn dropdown dropdown-left flex w-10/12 flex-row gap-2"
          >
            <div className="flex w-full flex-row items-center gap-2">
            <BookOpenIcon className="h-6 w-6" />
              <h1 className="text-left">Journal Entry</h1>
            </div>
            <div className="dropdown-content z-[1] w-72 rounded-box bg-base-100 p-2 shadow">
              <JournalEntryForm />
            </div>
          </div>

          {/* Predict Trade with trading bot */}
          <div
            tabIndex={0}
            role="button"
            className="btn dropdown dropdown-left flex w-10/12 flex-row gap-2"
          >
            <div
              className="flex w-full flex-row items-center gap-2"
              onClick={() => {
                const requestBody = {
                  text: "Predict the price of bitcoin knowing that it is flucktiating between 68000 and 71000",
                };
                fetch("http://localhost:5000/trading-bot", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log("Success:", data);
                    setPredictedPrice(data.response);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  })
                  .finally(() => {
                    setPredictedPrice(data.response);
                  });
              }}
            >
              <CurrencyDollarIcon className="size-6" />
              <h1 className="text-left">AI Advisor</h1>
            </div>

            <div className="dropdown-content z-[1] w-72 rounded-box bg-base-100 p-2 shadow">
              <p>{predictedPrice}</p>
            </div>
          </div>

        

          {/* Create Alert */}
          <div
            tabIndex={0}
            role="button"
            className="btn dropdown dropdown-left flex w-10/12 flex-row gap-2"
          >
            <div className="flex w-full flex-row items-center gap-2">
            <ClockIcon className="h-6 w-6" />
              <h1 className="text-left">Alert</h1>
            </div>
            <div className="dropdown-content z-[1] w-72 rounded-box bg-base-100 p-2 shadow">
              <AlertForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
