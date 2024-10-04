import JournalEntrie from "./models/journalEntrie.js";

const articles = [
  {
    trade_result: "Winner",
    currency: "EUR/USD Short",
    reasoning:
      "Entered a short position on EUR/USD due to a bearish divergence on the 4-hour chart, combined with rising bond yields in the U.S. signaling strength in the dollar.",
    entry_date: "2024-10-16",
    mood: "Confident",
    market_conditions:
      "Mixed, with uncertainty around upcoming ECB policy decisions. Dollar strength prominent.",
    self_reflection:
      "Great entry point, but I could have scaled in slower. Need to remain patient when confirming divergences and not rush into full-size positions.",
  },
  {
    trade_result: "Break Even",
    currency: "Tesla Long",
    reasoning:
      "Took a long position in Tesla (TSLA) after a strong earnings report that exceeded expectations. There was a notable gap up in pre-market, and I anticipated momentum continuation.",
    entry_date: "2024-10-17",
    mood: "Optimistic",
    market_conditions:
      "Bullish for tech stocks, with the NASDAQ hitting new highs.",
    self_reflection:
      "Entry was well-timed, but exited too early, leaving profits on the table. Should trust my analysis more and let the trade run with a trailing stop.",
  },
  {
    trade_result: "Winner",
    currency: "Bitcoin Long",
    reasoning:
      "Bought BTC/USD after price bounced off a strong support zone at $26,000. The rebound was supported by increasing institutional inflows, suggesting accumulation.",
    entry_date: "2024-10-18",
    mood: "Calm",
    market_conditions:
      "Risk-on sentiment returning to crypto, with Bitcoin leading the charge.",
    self_reflection:
      "Held my conviction even when volatility spiked, which paid off. Solid risk management by keeping a stop just below support, but I could've sized up slightly for more reward.",
  },
  {
    trade_result: "Loser",
    currency: "Oil Short",
    reasoning:
      "Took a short position on oil (WTI) after noticing a sharp increase in U.S. crude inventories and weak demand forecasts from OPEC. Technicals also showed a rejection at key resistance.",
    entry_date: "2024-10-19",
    mood: "Confident",
    market_conditions:
      "Bearish for oil, with economic slowdown fears driving down commodity prices.",
    self_reflection:
      "Excellent combination of macro and technical analysis. However, I exited too early again—should revisit my exit strategy on commodity trades, especially with high volatility assets like oil.",
  },
  {
    trade_result: "Winner",
    currency: "Apple Long",
    reasoning:
      "Entered a long position on Apple (AAPL) after a sharp pullback to its 50-day moving average. Strong institutional buying seen on the tape, signaling this was likely a temporary dip.",
    entry_date: "2024-10-20",
    mood: "Cautious",
    market_conditions:
      "Equities are mixed, with a rotation out of tech, but Apple remains a strong outlier.",
    self_reflection:
      "Patience paid off. I waited for a key technical level and confirmation from the tape. I held the position through minor pullbacks and exited near a key resistance.",
  },
];

const createMultipleArticles = async (articles) => {
  try {
    // Ensure the table is in sync with the model
    await JournalEntrie.sync({ force: false });

    for (let articleData of articles) {
      await JournalEntrie.create({
        trade_result: articleData.trade_result,
        currency: articleData.currency,
        reasoning: articleData.reasoning,
        entry_date: articleData.entry_date,
        mood: articleData.mood,
        market_conditions: articleData.market_conditions,
        self_reflection: articleData.self_reflection,
        user_id: 1,
      });
    }

    console.log("All articles created successfully");
  } catch (err) {
    console.error("Error creating articles:", err.message);
  }
};

createMultipleArticles(articles);
