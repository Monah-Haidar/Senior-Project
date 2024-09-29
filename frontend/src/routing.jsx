import { Route, Routes } from "react-router-dom";

import MarketPrices from "./pages/marketPrices";
import MarketNews from "./pages/marketNews";
import Academy from "./pages/academy";
import Journal from "./pages/journal";
import Dashboard from "./pages/dashboard";

import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

function Routing() {
    return (
        <>
            <Routes>
                <Route path="/market-prices" element={<MarketPrices />} />
                <Route path="/market-news" element={<MarketNews />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/" element={<Dashboard />} />


                <Route path="/user/signIn" element={<SignIn />} />
                <Route path="/user/signUp" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default Routing;