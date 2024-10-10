import { Routes, Route } from "react-router-dom";
// import WatchlistProvider from "./context/WatchlistProvider";

import Layout from "./components/layout";
import RequireAuth from "./components/requireAuth";
import PersistentLogin from "./components/persistentLogin";

import MarketPrices from "./pages/marketPrices";
import MarketNews from "./pages/marketNews";
import Academy from "./pages/academy";
import Journal from "./pages/journal";
import Dashboard from "./pages/dashboard";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

import Trade from "./pages/trade";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Layout />}>
          {/* Public Routes */}
          <Route path="user/sign-in" element={<SignIn />} />
          <Route path="user/sign-up" element={<SignUp />} />
          <Route path="market-news" element={<MarketNews />} />
          <Route path="academy" element={<Academy />} />

          {/* Private Routes */}
          <Route element={<PersistentLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="" element={<Dashboard />} />
              <Route path="journal" element={<Journal />} />
              <Route path="trade" element={<Trade />} />
              <Route path="market-prices" element={<MarketPrices />} />
            </Route>
          </Route>


        </Route>
      </Routes>
    </>
  );
}

export default App;
