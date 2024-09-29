import { useState } from "react";

import TradingViewWidget from "../components/trade/chart";
// import JournalEntryForm from "../components/trade/journalForm";
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
} from "@heroicons/react/24/outline";
// import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

// import PredictForm from "../components/trade/predictForms";


function Trade() {
  const [predictedPrice, setPredictedPrice] = useState("");

  return (
    <div className=" flex flex-row">
      <div className="h-[90vh] flex flex-col overflow-hidden w-[90vw]">
        
        {/* CHART */}
        <div className="flex-1 overflow-hidden">
          <TradingViewWidget />
        </div>
      </div>




      {/* sidebar */}
      <div className="flex flex-col items-center gap-4 pt-4 w-[10vw]">
        <div className="flex flex-col items-center gap-4 pt-4 w-[10vw]">


          {/* Market Order */}
          <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div className="flex flex-row gap-2 items-center w-full">
              {/* <Chart /> */}
              <h1 className="text-left">Market Order</h1>
            </div>

            <div className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-72">
              <TradeForm />
            </div>
          </div>

          {/* Limit Order */}
          <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div className="flex flex-row gap-2 items-center w-full">
              <CogIcon className=" size-6" />
              <h1 className="text-left">Limit Order</h1>
            </div>
            <div className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-72">
              <AutomateForm />
            </div>
          </div>

          {/* <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div className="flex flex-row gap-2 items-center w-full">
              <PresentationChartLineIcon className=" size-6" />
              <h1 className="text-left">Smart Journal</h1>
            </div>
            <div className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-72">
              <PredictForm />
            </div>
          </div> */}

          {/* Predict Trade with trading bot */}
          <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div
              className="flex flex-row gap-2 items-center w-full"
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
            
            <div className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-72">
              <p>{predictedPrice}</p>
            </div>
          </div>

          {/* Journal Button with Dropdown */}
          {/* <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div className="flex flex-row gap-2 items-center w-full">
              <BookOpen />
              <h1 className="text-left">Journal Entry</h1>
            </div>
            <div className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-72">
              <JournalEntryForm />
            </div>
          </div> */}

          {/* Create Alert */}
          <div
            tabIndex={0}
            role="button"
            className="flex flex-row gap-2 btn w-10/12 dropdown dropdown-left"
          >
            <div className="flex flex-row gap-2 items-center w-full">
              {/* <BellAlert /> */}
              <h1 className="text-left">Alert</h1>
            </div>
            <div className="dropdown-content z-[1]  p-2 shadow bg-base-100 rounded-box w-72">
              <AlertForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
