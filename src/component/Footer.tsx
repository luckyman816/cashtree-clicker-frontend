import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname); // Initialize state with current pathname
  useEffect(() => {
    // Update the state whenever the location changes
    setPath(location.pathname);
  }, [location]);
  return (
    <div className="grid grid-cols-5 justify-center items-center px-3 w-full rounded-t-xl bg-[#120F29]">
      <Link
        to="/quest"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/quest"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img
          src="/image/footer/refferal.png"
          alt="quest"
          className=" w-12 h-12 border border-white rounded-lg"
        />
      </Link>
      <Link
        to="/task"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/task"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/task.png" alt="ranking" className="w-12 h-12 border border-white rounded-lg" />
      </Link>
      <Link
        to="/"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/" ? "scale-[110%] opacity-100" : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/earn.png" alt="play" className=" w-20 h-20 " />
      </Link>
      <Link
        to="/boost"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/boost"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img src="/image/footer/boost.png" alt="boost" className=" w-12 h-12 border border-white rounded-lg" />
      </Link>
      <Link
        to="/airdrop"
        className={`flex flex-col items-center justify-center cursor-pointer transform origin-bottom transition ${path === "/airdrop"
          ? "scale-[110%] opacity-100"
          : "opacity-50 text-white"
          }`}
      >
        <img
          src="/image/footer/airdrop.png "
          alt="airdrop"
          className=" w-12 h-12 border border-white rounded-lg"
        />
      </Link>
    </div>
  );
}
