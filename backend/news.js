import New from "./models/new.js";

const articles = [
    // forex
  {
    news_url:
      "https://www.fxstreet.com/news/eur-usd-expected-to-trade-between-11000-and-10050-uob-group-202410040920",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/a/u/f31-212997.jpg",
    title: "EUR/USD: Expected to trade between 1.1000 and 1.0050 – UOB Group",
    text: "The Euro (EUR) is expected to trade between 1.1000 and 1.0050. In the longer run, to continue to decline, EUR not only has to break below 1.1000, but also the next solid support at 1.0980, UOB Group FX analysts Quek Ser Leang and Lee Sue Ann note.",
    source_name: "FX Street",
    date: "Fri, 04 Oct 2024 05:20:55 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.actionforex.com/contributors/technical-analysis/570588-eur-usd-hits-three-week-low-amid-ecb-easing-expectations/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/t/9/f21-212991.jpg",
    title: "EUR/USD Hits Three-Week Low Amid ECB Easing Expectations",
    text: "The EUR/USD pair has descended to 1.1027, marking its lowest point in three weeks. The drop reflects market anticipation that the European Central Bank (ECB) will continue to ease monetary policy aggressively, spurred by sluggish economic growth and inflation rates falling below the ECB's 2% target in the Eurozone.",
    source_name: "Action Forex",
    date: "Fri, 04 Oct 2024 04:52:15 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Negative",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/japanese-yen-rebounds-analysis-for-usd-jpy-eur-usd-aud-usd-nzd-usd-1466105",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/8/w/f6-212980.jpg",
    title:
      "Japanese Yen Rebounds: Analysis For USD/JPY, EUR/USD, AUD/USD, NZD/USD",
    text: "USD/JPY traders take some profits off the table after the recent move.",
    source_name: "FXEmpire",
    date: "Fri, 04 Oct 2024 04:29:51 -0400",
    topics: ["Australia", "Japan", "USA", "New Zealand", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["AUD-USD", "EUR-USD", "NZD-USD", "USD-JPY"],
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/us-dollar-price-forecast-nonfarm-payrolls-in-focus-gold-gbp-usd-and-eur-usd-outlook-1465865",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/5/x/f40-212974.jpg",
    title:
      "US Dollar Price Forecast: Nonfarm Payrolls in Focus—Gold, GBP/USD and EUR/USD Outlook",
    text: "The upcoming Nonfarm Payrolls report could shift the outlook for gold and USD pairs. Traders eye employment data for potential Fed policy changes.",
    source_name: "FXEmpire",
    date: "Fri, 04 Oct 2024 04:05:09 -0400",
    topics: ["Gold", "USA", "United Kingdom", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD", "GBP-USD"],
  },
  {
    news_url:
      "https://www.fxstreet.com/news/eur-usd-trades-cautiously-above-11000-ahead-of-us-nfp-202410040755",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/j/y/f16-212988.jpg",
    title: "EUR/USD trades cautiously above 1.1000 ahead of US NFP",
    text: "EUR/USD trades in a tight range above the psychological support of 1.1000 in Friday's European session. The major currency pair consolidates near 1.1030, while the US Dollar (USD) edges lower ahead of the United States (US) Nonfarm Payrolls (NFP) report for September, which will published at 12:30 GMT.",
    source_name: "FX Street",
    date: "Fri, 04 Oct 2024 03:55:37 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.fxstreet.com/news/eur-usd-extends-losing-streak-toward-11000-due-to-rising-odds-of-an-ecb-rate-cut-202410040440",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/h/e/f29-212931.jpg",
    title:
      "EUR/USD extends losing streak toward 1.1000 due to rising odds of an ECB rate cut",
    text: "EUR/USD continues its losing streak for the sixth successive session, trading around 1.1030 during the Asian hours on Friday. Lower Eurozone inflation reading raised expectations of a rate cut by the European Central Bank (ECB) in October, which would mark the central bank's third reduction this year.",
    source_name: "FX Street",
    date: "Fri, 04 Oct 2024 00:40:32 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Negative",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.fxstreet.com/news/eur-usd-remains-on-the-defensive-below-11050-all-eyes-on-us-nfp-data-202410032317",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/a/a/f30-212901.jpg",
    title:
      "EUR/USD remains on the defensive below 1.1050, all eyes on US NFP data",
    text: "EUR/USD remains on the defensive below 1.1050, all eyes on US NFP data",
    source_name: "FX Street",
    date: "Thu, 03 Oct 2024 19:17:39 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Negative",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/u-s-dollar-gains-more-ground-analysis-for-eur-usd-gbp-usd-usd-jpy-usd-cad-1465977",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/s/k/f10-212889.jpg",
    title:
      "U.S. Dollar Gains More Ground: Analysis For EUR/USD, GBP/USD, USD/JPY, USD/CAD",
    text: "The encouraging Services PMI data provided support to the American currency.",
    source_name: "FXEmpire",
    date: "Thu, 03 Oct 2024 12:52:12 -0400",
    topics: ["Japan", "USA", "Canada", "United Kingdom", "Europe"],
    sentiment: "Positive",
    type: "Article",
    currency: ["EUR-USD", "GBP-USD", "USD-CAD", "USD-JPY"],
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/eur-usd-forecast-euro-continues-to-look-for-the-floor-1465873",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/9/v/f33-212840.jpg",
    title: "EUR/USD Forecast – Euro Continues to Look For The Floor",
    text: "In the early hours of Thursday, the Euro continues to see a bit of overhead pressure. At this point, the market looks likely to continue to see a lot of interest in the “large, round, psychological numbers” going back and forth.",
    source_name: "FXEmpire",
    date: "Thu, 03 Oct 2024 07:09:52 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://news.investingcube.com/eur-usd-price-today-will-bulls-defend-1-1030-support/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/s/l/f29-212835.jpg",
    title: "EUR/USD Price Today: Will Bulls Defend 1.1030 Support?",
    text: "EUR/USD has been fluctuating within a narrow range due to economic uncertainty from USA and Europe affecting the currency pair.",
    source_name: "InvestingCube",
    date: "Thu, 03 Oct 2024 06:43:39 -0400",
    topics: ["USA", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD"],
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/us-dollar-price-forecast-services-pmi-in-focus-gold-eur-usd-and-gbp-usd-outlook-1465763",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/o/v/f5-212811.jpg",
    title:
      "US Dollar Price Forecast: Services PMI in Focus; Gold, EUR/USD, and GBP/USD Outlook",
    text: "US Dollar strengthens as Services PMI remains in focus. Gold, EUR/USD, and GBP/USD traders watch key data for potential market shifts.",
    source_name: "FXEmpire",
    date: "Thu, 03 Oct 2024 04:42:05 -0400",
    topics: ["Gold", "USA", "United Kingdom", "Europe"],
    sentiment: "Neutral",
    type: "Article",
    currency: ["EUR-USD", "GBP-USD", "XAU-USD"],
  },
  {
    "news_url": "https://www.fxstreet.com/news/usd-jpy-dollar-short-squeeze-that-was-most-gelt-in-ocbc-202410041026",
    "image_url": "https://forexnewsapi.snapi.dev/images/v1/4/b/f5-213011.jpg",
    "title": "USD/JPY: Dollar short squeeze that was most gelt in – OCBC",
    "text": "USD/JPY recent rally can be attributed to comments from new PM Ishiba and Governor Ueda. Pair was last at 146.46, OCBC's FX analysts Frances Cheung and Christopher Wong note.",
    "source_name": "FX Street",
    "date": "Fri, 04 Oct 2024 06:26:19 -0400",
    "topics": [
        "Japan",
        "USA"
    ],
    "sentiment": "Positive",
    "type": "Article",
    "currency": [
        "USD-JPY"
    ]
},

  // federal reserve
  {
    news_url:
      "https://www.fxstreet.com/news/us-core-pce-set-to-show-continued-disinflation-trend-reinforcing-federal-reserve-easing-cycle-202409270600",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/v/c/f22-211818.jpg",
    title:
      "US core PCE set to show continued disinflation trend, reinforcing Federal Reserve easing cycle",
    text: "The United States Bureau of Economic Analysis (BEA) is set to release the significant Personal Consumption Expenditures (PCE) Price Index, which is the Federal Reserve's preferred measure of inflation, on Friday at 12:30 GMT.",
    source_name: "FX Street",
    date: "Fri, 27 Sep 2024 02:00:00 -0400",
    topics: ["USA"],
    sentiment: "Positive",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/what-just-happened-why-did-the-federal-reserve-just-cut-interest-rates-202409182037",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/w/q/f27-210383.jpg",
    title:
      "What just happened: Why did the Federal Reserve cut interest rates?",
    text: "The US Federal Reserve (Fed), easily the largest and most powerful central bank in the world, just decreased its Federal Funds Interest Rate by 50 basis points (bps) to a reference range of 4.75-5.0% percent. This is the first time that the US interest rate has been cut since March of 2020 and represents a major policy shift for the Fed.",
    source_name: "FX Street",
    date: "Wed, 18 Sep 2024 17:24:06 -0400",
    topics: ["USA"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/federal-reserve-set-for-first-interest-rate-reduction-in-four-years-amid-growing-bets-of-jumbo-cut-202409181000",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/q/s/f17-210265.jpg",
    title:
      "Federal Reserve set for first interest-rate reduction in four years amid growing bets of jumbo cut",
    text: "The US Federal Reserve (Fed) will announce monetary policy decisions following the September policy meeting and release the revised Summary of Economic Projections (SEP), the so-called dot plot, on Wednesday. Market participants widely anticipate that the US central bank will lower the policy rate, but the size of the cut is up in the air.",
    source_name: "FX Street",
    date: "Wed, 18 Sep 2024 06:00:00 -0400",
    topics: ["USA"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.forex.com/en-us/news-and-analysis/federal-reserve-rate-decision-preview-sep-2024-09-17-2024/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/k/z/f14-210092.jpg",
    title: "Federal Reserve Rate Decision Preview (SEP 2024)",
    text: "The Federal Reserve stuck to its restrictive policy in July, with the central bank keeping US interest rates within its current threshold of 5.25% to 5.50%.",
    source_name: "Forexcom",
    date: "Tue, 17 Sep 2024 11:00:00 -0400",
    topics: ["USA"],
    sentiment: "Neutral",
    type: "Article",
  },
  //CPI
  {
    news_url:
      "https://www.forexlive.com/news/turkish-cpi-inflation-drops-to-494-in-september-20241003/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/j/j/f23-212828.jpg",
    title: "Turkish CPI Inflation Drops to 49.4% in September",
    text: "Turkish CPI inflation declines to 49.4% y/y in September Full Story via EmergingMarketWatch PiQ Suite Prices rise by 3% m/m, showing underlying pressures Education costs surge due to a spike in tertiary fees Housing costs climb, driven by 7.6% increase in rents ading base effects challenge CBT reaching the inflation target This article was written by Ryan Paisey at www.forexlive.com.",
    source_name: "Forex Live",
    date: "Thu, 03 Oct 2024 05:38:52 -0400",
    topics: ["Turkey"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.actionforex.com/contributors/fundamental-analysis/570410-september-cpi-preview-sticky-looking-core-to-be-temporary/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/g/d/f18-212786.jpg",
    title: "September CPI Preview: Sticky-Looking Core to Be Temporary",
    text: "The overall progress in reining in decades-high inflation should be on display with the September CPI report. We look for the headline to advance 0.1%, which would bring the year-over-year rate down to 2.3% and point to headline PCE rising 2.0%—directly on the FOMC's target in what will be the last read on inflation before the Committee's November 7 meeting.",
    source_name: "Action Forex",
    date: "Thu, 03 Oct 2024 03:34:30 -0400",
    topics: [],
    sentiment: "Positive",
    type: "Article",
  },

  // Unemployemnt
  {
    news_url:
      "https://www.fxstreet.com/news/norway-registered-unemployment-nsa-came-in-at-19-above-forecasts-17-in-february-202303030902",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/c/x/f12-127452.jpg",
    title:
      "Norway Registered Unemployment n.s.a came in at 1.9%, above forecasts (1.7%) in February",
    text: "Norway Registered Unemployment n.s.a came in at 1.9%, above forecasts (1.7%) in February",
    source_name: "FX Street",
    date: "Fri, 03 Mar 2023 04:02:41 -0500",
    topics: ["Norway", "unemployment"],
    sentiment: "Positive",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/norway-registered-unemployment-sa-above-forecasts-58865k-in-february-actual-5998k-202303030901",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/u/k/f14-127454.jpg",
    title:
      "Norway Registered Unemployment s.a above forecasts (58.865K) in February: Actual (59.98K)",
    text: "Norway Registered Unemployment s.a above forecasts (58.865K) in February: Actual (59.98K)",
    source_name: "FX Street",
    date: "Fri, 03 Mar 2023 04:01:01 -0500",
    topics: ["Norway", "unemployment"],
    sentiment: "Negative",
    type: "Article",
  },

  // United States
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/fed-may-hold-rate-cuts-as-september-job-gains-slow-wage-growth-stays-moderate-1466126",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/2/r/f11-213016.jpg",
    title:
      "Fed May Hold Rate Cuts as September Job Gains Slow, Wage Growth Stays Moderate",
    text: "With slower hiring and moderate wage growth in September, the Fed may delay rate cuts, raising questions on the future of inflation control and economic growth.",
    source_name: "FXEmpire",
    date: "Fri, 04 Oct 2024 06:40:49 -0400",
    topics: ["USA"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/pound-sterling-recovers-from-13100-against-us-dollar-ahead-of-us-nfp-202410041006",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/e/7/f39-213005.jpg",
    title:
      "Pound Sterling recovers from 1.3100 against US Dollar ahead of US NFP",
    text: "The Pound Sterling (GBP) finds buying interest near the round-level support of 1.3100 against the US Dollar (USD) in Friday's London session. The GBP/USD pair moves higher to 1.3160 after a three-day losing spree.",
    source_name: "FX Street",
    date: "Fri, 04 Oct 2024 06:06:09 -0400",
    topics: ["USA", "United Kingdom"],
    sentiment: "Positive",
    type: "Article",
  },

  // Oil
  {
    news_url:
      "https://www.fxstreet.com/news/crude-oil-posts-fresh-monthly-high-as-markets-weigh-up-likelihood-of-fresh-escalation-in-middle-east-202410041024",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/g/q/f4-213010.jpg",
    title:
      "Crude Oil posts fresh monthly high as markets weigh up likelihood of fresh escalation in Middle East",
    text: "Crude Oil heads into its fourth straight day of gains for this week, accumulating more than 8% price rise since its opening on Monday. With tensions not easing in Lebanon, more risk is being priced in after headlines emerged that Israel was seeking green light from the Biden administration to target Oil installations in Iran.",
    source_name: "FX Street",
    date: "Fri, 04 Oct 2024 06:24:12 -0400",
    topics: ["Oil"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/natural-gas-and-oil-forecast-geopolitical-risks-drive-volatility-in-prices-is-more-upside-ahead-1465880",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/3/0/f38-212938.jpg",
    title:
      "Natural Gas and Oil Forecast: Geopolitical Risks Drive Volatility in Prices—Is More Upside Ahead?",
    text: "Oil prices up 8% for the week amid Middle East tensions and supply uncertainties, keeping traders on edge.",
    source_name: "FXEmpire",
    date: "Fri, 04 Oct 2024 01:38:57 -0400",
    topics: ["Oil", "Natural Gas"],
    sentiment: "Positive",
    type: "Article",
  },

  //Gold
  {
    news_url:
      "https://www.forex.com/en-us/news-and-analysis/usd-gold-crude-oil-asian-open-2024-09-26/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/r/t/f37-211524.jpg",
    title:
      "USD reverses, gold-bulls eye 2700, crude oil falters ahead of US GDP",
    text: "Traders appear to be booking profits ahead of a key US GDP report later today, and a highly anticipated PCE inflation report tomorrow. The US dollar was the strongest major currency on Fridy after the USD index provided a solid bounce from thew 100 handle.",
    source_name: "Forexcom",
    date: "Wed, 25 Sep 2024 18:15:00 -0400",
    topics: ["Gold", "Oil", "USA"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/gold-price-forecast-gold-market-continues-to-flirt-with-a-major-moving-average-1152891",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/9/a/gold-59-2-105160.jpg",
    title:
      "Gold Price Forecast – Gold Market Continues to Flirt With a Major Moving Average",
    text: "The gold market has done very little during the trading session on Thursday as we await the jobs number on Friday.",
    source_name: "FXEmpire",
    date: "Thu, 06 Oct 2022 09:30:29 -0400",
    topics: ["Gold"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/daily-gold-update-thursday-october-6-gold-extends-short-term-fluctuations-1152713",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/q/f/shutterstock-2187489465-105136.jpg",
    title:
      "Daily Gold Update: Thursday, October 6 – Gold Extends Short-Term Fluctuations",
    text: "Below you will find our Gold, Silver, and Mining Stocks economic news schedule for the next two trading days.",
    source_name: "FXEmpire",
    date: "Thu, 06 Oct 2022 07:40:47 -0400",
    topics: ["Gold"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/gold-settled-back-above-the-50-ema-1152310",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/e/k/shutterstock-59595097-1-105068.jpg",
    title: "Gold Settled Back Above The 50 EMA",
    text: "Gold is moving towards the resistance level at $1730.",
    source_name: "FXEmpire",
    date: "Thu, 06 Oct 2022 03:00:14 -0400",
    topics: ["Gold"],
    sentiment: "Positive",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/gold-futures-room-for-extra-upside-202210060514",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/c/k/f24-105034.jpg",
    title: "Gold Futures: Room for extra upside",
    text: "Open interest in gold futures markets shrank for the second session in a row on Wednesday, this time by around 2.7K contracts according to advanced pr",
    source_name: "FX Street",
    date: "Thu, 06 Oct 2022 01:14:02 -0400",
    topics: ["Gold"],
    sentiment: "Positive",
    type: "Article",
  },
  {
    news_url:
      "https://forexlive.com/news/commerzbank-says-we-are-downwardly-revising-our-gold-price-forecast-20221005/",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/8/g/f32-104970.jpg",
    title:
      'Commerzbank says "We are downwardly revising our gold price forecast"',
    text: "Analysts at the bank are citing: expect the Fed Funds Rate to climb to 5% by the spring of 2023 and thus the US dollar is therefore likely to remain strong for quite some time yet which provides a headwind for gold, to persist for some considerable time Forecasts: $1,700 per troy ounce for the end of 2022 (previously $1,800) “The lower starting level, noticeably higher interest rate forecast and lower prediction for the EUR/USD exchange rate also translate into a lower path for the gold price next year. We expect gold to climb to $1,800 per troy ounce by the end of 2023 (previously $1,900).",
    source_name: "Forex Live",
    date: "Wed, 05 Oct 2022 17:05:19 -0400",
    topics: ["Gold"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxstreet.com/news/gold-extends-slide-toward-1-700-after-us-data-202210051425",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/g/x/f33-104941.jpg",
    title: "Gold extends slide toward $1,700 after US data",
    text: "Gold came under renewed bearish pressure and dropped toward $1,700 during the American trading hours on Wednesday. As of writing, XAU/USD was down 1.2",
    source_name: "FX Street",
    date: "Wed, 05 Oct 2022 10:25:22 -0400",
    topics: ["Gold", "USA"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/gold-price-forecast-gold-markets-pulled-back-slightly-4-1151557",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/q/q/shutterstock-59595097-104930.jpg",
    title: "Gold Price Forecast – Gold Markets Pulled Back Slightly",
    text: "Gold markets have pulled back a bit during the training session on Wednesday as we reached the 50-Day EMA.",
    source_name: "FXEmpire",
    date: "Wed, 05 Oct 2022 10:08:06 -0400",
    topics: ["Gold"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.monetamarkets.com/gold-remains-pressured-below-1720-whats-next/?utm_source=rss&utm_medium=rss&utm_campaign=gold-remains-pressured-below-1720-whats-next",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/a/a/gold-1024x342-104923.png",
    title: "Gold remains pressured below $1,720; what's Next?",
    text: "After showing good recovery moves Gold's price traded in the red on Wednesday. A risk aversion in the market compels investors to place fresh bids for the US dollar.",
    source_name: "MonetaMarkets",
    date: "Wed, 05 Oct 2022 09:38:11 -0400",
    topics: ["Gold"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.fxempire.com/forecasts/article/daily-gold-update-wednesday-october-5-gold-price-remains-close-to-1700-1151348",
    image_url:
      "https://forexnewsapi.snapi.dev/images/v1/y/w/shutterstock-2187358019-104884.jpg",
    title:
      "Daily Gold Update: Wednesday, October 5 – Gold Price Remains Close to $1,700",
    text: "Today, gold is 0.9% lower, as it is trading closer to the $1700 level. What about the other precious metals?",
    source_name: "FXEmpire",
    date: "Wed, 05 Oct 2022 07:59:38 -0400",
    topics: ["Gold"],
    sentiment: "Neutral",
    type: "Article",
  },
  {
    news_url:
      "https://www.xm.com/research/analysis/technicalAnalysis/xm/technical-analysis-gold-faces-profit-taking-after-quick-rally-167823",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/a/g/goldh4-105119.png",
    title: "Technical Analysis – Gold faces profit taking after quick rally",
    text: "Gold drifted lower and back into the broken 2022 bearish channel after its two-day exciting rally stalled at 1,729 – the highest since September 13.",
    source_name: "XM",
    date: "Wed, 05 Oct 2022 06:23:03 -0400",
    topics: ["Gold"],
    sentiment: "Negative",
    type: "Article",
  },
  {
    news_url:
      "https://www.dailyfx.com/news/gold-price-rally-blocked-by-resistance-key-us-jobs-report-nears-20221005.html",
    image_url: "https://forexnewsapi.snapi.dev/images/v1/g/o/f32-104864.jpg",
    title: "Gold Price Rally Blocked by Resistance, Key US Jobs Report Nears",
    text: "The precious metal has been on a strong run of late, fueled by lower US rate expectations. Traders are now looking ahead to the latest US jobs report.",
    source_name: "DailyFX",
    date: "Wed, 05 Oct 2022 05:30:28 -0400",
    topics: ["Gold", "USA"],
    sentiment: "Negative",
    type: "Article",
  },
];

function determineCategory(news) {
  // Check for specific financial topics
  if (news.currency) {
    return "forex";
  }
  if (news.topics) {
    // Define the economic keywords
    const economicKeywords = [
      "cpi",
      "ppi",
      "oil",
      "natural gas",
      "unemployment",
      "home sales",
    ];
    // Check for 'gold'
    if (news.topics.includes("Gold")) {
      return "gold";
    }
    // Check for economic keywords
    if (
      news.topics.some((topic) =>
        economicKeywords.includes(topic.toLowerCase())
      )
    ) {
      return "economy";
    }
  }
  return "general";
}

const createMultipleArticles = async (articles) => {
  try {
    await New.sync({ force: false });

    for (let articleData of articles) {
      await New.findOrCreate({
        where: { title: articleData.title },
        defaults: {
          title: articleData.title,
          publication_time: articleData.date,
          source_name: articleData.source_name,
          news_url: articleData.news_url,
          related_instruments: articleData.currency
            ? articleData.currency.join(", ")
            : null,
          img_url: articleData.image_url,
          sentiment: articleData.sentiment,
          category: determineCategory(articleData),
        },
      });
    }

    console.log("All articles created successfully");
  } catch (err) {
    console.error("Error creating articles:", err.message);
  }
};

createMultipleArticles(articles);
