import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/font.css";
export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="grid grid-cols-5 justify-center items-center px-3 w-full rounded-t-3xl bg-[#120F29]">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/" ? "scale-[110%] opacity-100" : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/earn.png" alt="earn" className=" w-12 h-12 " />
        <h1 className="text-white text-xl" style={{fontFamily: "archivo"}}>Earn</h1>
      </Link>
      <Link
        to="/mission"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/task"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/mission.png" alt="mission" className="w-12 h-12 border border-white rounded-lg" />
        <h1 className="text-white text-xl" style={{fontFamily: "archivo"}}>Mission</h1>
      </Link>
      <Link
        to="/friends"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/quest"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img
          src="/image/footer/friends.png"
          alt="friends"
          className=" w-12 h-12 border border-white rounded-lg"
        />
        <h1 className="text-white text-xl" style={{fontFamily: "archivo"}}>Friends</h1>
      </Link>
      <Link
        to="/leaderboard"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/boost"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/leaderboard.png" alt="leaderboard" className=" w-12 h-12 border border-white rounded-lg" />
        <h1 className="text-white text-xl" style={{fontFamily: "archivo"}}>leaderboard</h1>
      </Link>
      <Link
        to="/wallet"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/airdrop"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img
          src="/image/footer/wallet.png "
          alt="wallet"
          className=" w-12 h-12 border border-white rounded-lg"
        />
        <h1 className="text-white text-xl" style={{fontFamily: "archivo"}}>Wallet</h1>
      </Link>
    </div>
  );
}
