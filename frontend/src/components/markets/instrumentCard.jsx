import useWatchlist from "../../hooks/useWatchlist";

import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

function InstrumentCard(props) {


  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  // const isInWatchlist = watchlist.some(
  //   (inst) => inst.id === props.instrument_id
  // );

  // const handleWatchlistToggle = () => {
  //   if (isInWatchlist) {
  //     removeFromWatchlist(props.instrument_id);
  //   } else {
  //     addToWatchlist({
  //       id: props.instrument_id,
  //       rank: props.rank,
  //       name: props.name,
  //       price: props.price,
  //       percentChange24h: props.percentChange24h,
  //       volumeChange24h: props.volumeChange24h,
  //       marketCap: props.marketCap,
  //       circulatingSupply: props.circulatingSupply,
  //       totalSupply: props.totalSupply,
  //     });
  //   }
  // };

  const getColorClass = (value) => {
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <>
      <div className="flex flex-row  items-center text-base h-14 px-4 -mx-4 rounded-xl hover:hover:bg-[#F6F6F6]">
        <div className="w-20 font-mono">{props.rank}</div>

        <div className="w-36 font-body">{props.name}</div>

        <div className="flex flex-row items-center text-right h-14 gap-x-4">
          <div className="w-36 font-mono">
            <span className={getColorClass(props.price)}>{props.price}</span>
          </div>

          <div className="w-36 font-mono">
            <span className={getColorClass(props.percentChange24h)}>
              {props.percentChange24h}%
            </span>
          </div>

          <div className="w-36 font-mono">
            <span className={getColorClass(props.volumeChange24h)}>
              {props.volumeChange24h}
            </span>
          </div>

          <div className="w-36 font-mono">{props.marketCap}</div>

          <div className="w-36 font-mono">{props.circulatingSupply}</div>

          <div className="w-36 font-mono">{props.totalSupply}</div>

          {/* ADD / REMOVE FROM WATCHLIST */}

          {/* <button onClick={handleWatchlistToggle}>
            {isInWatchlist ? <StarIconSolid className="size-5 text-yellow-500" /> : <StarIcon className=" size-5"/>}
          </button> */}

          {/* {isInWatchlist ? (
            <StarIconSolid
              className="size-5 text-yellow-500"
              onClick={() => {
                addToWatchlist();
              }}
            />
          ) : (
            <StarIcon
              className=" size-5"
              onClick={() => {
                removeFromWatchlist();
              }}
            />
          )} */}
        </div>
      </div>
    </>
  );
}
export default InstrumentCard;
