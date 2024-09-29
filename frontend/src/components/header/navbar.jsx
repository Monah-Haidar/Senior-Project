import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LogoSVG from "../../assets/logoSVG.jsx";

function Navbar() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    switch (location.pathname) {
      case "/market-prices":
        setIsActive(0);
        break;
      case "/trade":
        setIsActive(1);
        break;
      case "/market-news":
        setIsActive(2);
        break;
      case "/journal":
        setIsActive(3);
        break;
      case "/academy":
        setIsActive(5);
        break;
      default:
        setIsActive(null);
    }
  }, [location.pathname]);

  function handleClick(index) {
    setIsActive(index);
  }

  return (
    <>
      <div className="flex flex-row items-center gap-4 h-16 font-display font-semibold">
        <div className="flex flex-row items-center">
          <Link
            className="text-primary font-semibold text-2xl h-4 flex flex-row items-center"
            to="/dashboard"
          >
            <LogoSVG />
            TerraTrade
          </Link>
        </div>

        <ul className="hidden lg:flex flex-row h-16">
          <li className="h-16 flex items-center">
            <Link
              className={`text-sm hover:text-primary hover:bg-[#F6F6F6] py-2 px-3 rounded-full ${
                isActive === 1 ? "text-primary" : ""
              }`}
              to="/trade"
            >
              Trade
            </Link>
          </li>

          <li className="h-16 flex items-center">
            <Link
              className={`text-sm hover:text-primary hover:bg-[#F6F6F6] py-2 px-3 rounded-full ${
                isActive === 3 ? "text-primary" : ""
              }`}
              to="/journal"
            >
              Trading Journal
            </Link>
          </li>

          <li className="h-16 flex items-center">
            <Link
              className={`text-sm hover:text-primary hover:bg-[#F6F6F6] py-2 px-3 rounded-full ${
                isActive === 0 ? "text-primary" : ""
              }`}
              to="/market-prices"
            >
              Markets
            </Link>
          </li>

          <li className="h-16 flex items-center">
            <Link
              className={`text-sm hover:text-primary hover:bg-[#F6F6F6] py-2 px-3 rounded-full ${
                isActive === 2 ? "text-primary" : ""
              }`}
              to="/market-news"
            >
              News
            </Link>
          </li>

          <li className="h-16 flex items-center">
            <Link
              className={`text-sm hover:text-primary hover:bg-[#F6F6F6] py-2 px-3 rounded-full ${
                isActive === 5 ? "text-primary" : ""
              }`}
              to="/academy"
            >
              Academy
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
