import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { WatchlistProvider } from "./context/WatchlistProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
