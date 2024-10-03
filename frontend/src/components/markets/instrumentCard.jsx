import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";

function InstrumentCard(props) {
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

  const [isInWatchlist, setIsInWatchlist] = useState(props.isInWatchlist);
  const axiosPrivate = useAxiosPrivate();

  const removeItemFromWatchlist = async () => {
    try {
      setIsInWatchlist(false);
      await axiosPrivate.post(
        "api/price/watchlist/remove",
        JSON.stringify({ id: props.instrument_id })
      );
    } catch (error) {
      console.error("Error removing item from watchlist:", error);
    }
  };

  const addItemToWatchlist = async () => {
    try {
      setIsInWatchlist(true);
      await axiosPrivate.post(
        "api/price/watchlist/add",
        JSON.stringify({ id: props.instrument_id })
      );
    } catch (error) {
      console.error("Error adding item to watchlist:", error);
    }
  };

  // console.log("IS IN WATCHLIST", props.isInWatchlist, props.name);

  const getColorClass = (value) => {
    return value >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <>
      <tr className="font-mono text-base">
        <td>{props.rank}</td>
        <td>{props.name}</td>
        <td>
          <span className={getColorClass(props.price)}>{props.price}</span>
        </td>
        <td>
          <span className={getColorClass(props.percentChange24h)}>
            {props.percentChange24h}%
          </span>
        </td>
        <td>
          <span className={getColorClass(props.volumeChange24h)}>
            {props.volumeChange24h}
          </span>
        </td>
        <td>{props.marketCap}</td>
        <td>{props.circulatingSupply}</td>
        <td>{props.totalSupply}</td>
        <td>
          {isInWatchlist ? (
            <StarIconSolid
              className="size-5 text-yellow-500"
              onClick={() => {
                removeItemFromWatchlist();
              }}
            />
          ) : (
            <StarIcon
              className="size-5"
              onClick={() => {
                //add
                addItemToWatchlist();
              }}
            />
          )}
        </td>
      </tr>

      {/* <div className="flex flex-row  items-center text-base h-14 px-4 -mx-4 rounded-xl hover:hover:bg-[#F6F6F6]">
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
          <div className="w-36 font-mono pl-28"> */}
      {/* ADD / REMOVE FROM WATCHLIST
            {isInWatchlist ? (
              <StarIconSolid
                className="size-5 text-yellow-500"
                onClick={() => {
                  removeItemFromWatchlist();
                }}
              />
            ) : (
              <StarIcon
                className="size-5"
                onClick={() => {
                  //add
                  addItemToWatchlist();
                }}
              />
            )}
          </div>
        </div>
      </div> */}
    </>
  );
}
export default InstrumentCard;
