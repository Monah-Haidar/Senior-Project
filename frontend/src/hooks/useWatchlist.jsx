import { useContext } from "react";
import WatchlistContext from "../context/WatchlistProvider";

const useWatchlist = () => useContext(WatchlistContext);


export default useWatchlist;
