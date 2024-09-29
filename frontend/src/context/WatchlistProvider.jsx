import { useState, createContext } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    const addToWatchlist = (instrument) => {
        setWatchlist((prev) => [...prev, instrument]);
      };
    
      const removeFromWatchlist = (instrumentId) => {
        setWatchlist((prev) => prev.filter((inst) => inst.id !== instrumentId));
      };



    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    )

};

export default WatchlistContext;