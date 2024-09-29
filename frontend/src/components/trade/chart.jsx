import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef();
  const scriptAdded = useRef(false); // Use ref to keep track of script addition

  useEffect(() => {
    if (!scriptAdded.current) {
      // Check if the script has already been added
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
      scriptAdded.current = true; // Set the ref to true after adding the script
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%", overflow: "hidden" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
