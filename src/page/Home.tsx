/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../component/Footer";
import ProgressBar from "../component/ProgressBar";
import { dispatch, useSelector } from "../store";
import axios from "../utils/api";
import "../css/font.css";
import "../css/spread.css";
import { useNavigate } from "react-router-dom";
import { levelNames, levelTargets, levelBonus, energyLimit } from "../data";
import {
  insertWallet,
  updateWallet,
  updateEnergy,
  getWallet,
  updateTapLevel,
  updateBalance,
  updateLimit,
} from "../store/reducers/wallet";
import { addDailyCoinsReceivedStatus } from "../store/reducers/dailyCoins";
import { addDailyBoost } from "../store/reducers/dailyBoost";
function Home() {
  const navigate = useNavigate();
  const usernameState = useSelector((state) => state.wallet.user?.username);
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const energyState = useSelector((state) => state.wallet.user?.energy);
  const tapLevelState = useSelector((state) => state.wallet.user?.tap_level);
  const limitState = useSelector((state) => state.wallet.user?.limit);
  const [imgStatus, setImgStatus] = useState(false);
  const [tapLevel, setTapLevel] = useState<number>(tapLevelState);
  const [username, setUsername] = useState<string>(usernameState);
  const [token, setToken] = useState<number>(tokenState);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(energyState);
  const [limit, setLimit] = useState<number>(limitState);
  useEffect(() => {
    const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
    // console.log("=========>webapp", webapp);
    if (webapp) {
      setUsername(webapp["user"]["username"]);
      axios.post(`/vibe/add,`, { username: webapp["user"]["username"] });
      axios.post(`/earnings/add`, { username: webapp["user"]["username"] });
      dispatch(insertWallet(webapp["user"]["username"]));
      dispatch(addDailyCoinsReceivedStatus(webapp["user"]["username"]));
      dispatch(addDailyBoost(webapp["user"]["username"]));
      dispatch(getWallet(webapp["user"]["username"]))
    }
  }, []);
  console.log("---Telegram info----->", username);
  useEffect(() => {
    setTapLevel(tapLevelState);
    setToken(tokenState);
    setRemainedEnergy(energyState);
  }, [tapLevelState, tokenState, energyState, setTapLevel, setToken, setRemainedEnergy])
  useEffect(() => {
    setLimit(limitState);
  }, [limitState]);
  useEffect(() => {
    dispatch(insertWallet(username));
  }, [username]);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [score, setScore] = useState<string>(`+${tapLevel}`);
  const handleClick = (event: any) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `${score}`;
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "30px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = "white";
    newDiv.style.zIndex = "30";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainedEnergy < limit) {
        dispatch(updateEnergy(username, remainedEnergy + 1));
      }
    }, 216000);
    return () => clearInterval(interval);
  }, [username, remainedEnergy, limit]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (remainedEnergy > 0 && token < levelTargets[tapLevel]) {
      setScore(`+${tapLevel}`);
      if ((token + tapLevel) > levelTargets[tapLevel - 1]) {
        setToken(levelTargets[tapLevel - 1]);
        dispatch(updateWallet(username, levelTargets[tapLevel - 1], remainedEnergy - tapLevel)).then(() => {
          if (tapLevel < 10 && token == levelTargets[tapLevel - 1]) {
            dispatch(updateTapLevel(username, tapLevel + 1));
            dispatch(updateBalance(username, token + levelBonus[tapLevel - 1])).then(() => {
              toast.success("Level up! 🎉🎉🎉 You received bonus points!");
            })
            dispatch(updateLimit(username, energyLimit[tapLevel]))
          } else {
            toast.error("Maximum level reached!");
          }
        });
      } else {
        setToken(token + tapLevel);
        if (remainedEnergy - tapLevel < 0) {
          dispatch(updateWallet(username, token + tapLevel, 0));
          setRemainedEnergy(0);
        } else {
          dispatch(updateWallet(username, token + tapLevel, remainedEnergy - tapLevel));
          setRemainedEnergy(remainedEnergy - tapLevel);
        }
      }
      handleClick(event);
    }
  };
  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  const handleBoost = () => {
    navigate('/boost');
  }
  const handleLevelUp = () => {
    navigate('/level');
  }
  console.log("imgStatus", imgStatus);
  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <Toaster />
      <div className="flex justify-center items-center px-3 w-full py-3">
        <h3
          className="text-sm text-[white]"
          style={{ fontFamily: "archivo" }}
        >
          Cashtree Tap to Win
        </h3>
      </div>
      <div className="w-[90%] flex flex-col justify-center items-center gap-4">
        <div className="flex justify-between items-center w-full px-3 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7B34EF] rounded-[10px] border border-[#B386FB]">
          <div className=" flex justify-center items-center p-2 ">
            <img src="/image/assets/coin.png" alt="" className=" w-11 h-11" />
            <div className="flex flex-col justify-center items-center">
              <h2 className=" text-[11px] text-[#FFC107]">Earn Per Tap</h2>
              <h2 className="text-sm text-[white]">+{tapLevel} Poin</h2>
            </div>
          </div>

          <div className=" flex justify-center items-center p-2 ">
            <img src="/image/assets/earnLevel.png" alt="" className=" w-11 h-11" />
            <div className="flex flex-col justify-center items-center">
              <h2 className=" text-[11px] text-[#FFC107]">Earn to level up</h2>
              <h2 className="text-sm text-[white]">+{formatNumberWithCommas(levelTargets[tapLevel - 1])}k</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center p-3 gap-2">
        <ProgressBar value={tapLevel * 10} />
        <div className="flex w-full justify-between items-center p-3">
          <h1 className="text-[12px] text-white cursor-pointer" onClick={handleLevelUp}>Level: {levelNames[tapLevel - 1]} &#8250;</h1>
          <h1 className="text-[12px] text-white">Goal {tapLevel}/10</h1>
        </div>
      </div>
      <div className="flex justify-center items-center relative h-[45vh] w-full">
        <img className="flex justify-center items-center absolute w-auto h-[90%] z-10 bg-cover bg-no-repeat bottom-[15%]" src="/image/tap-image/cashtree_bg.png">
        </img>
        <div className="absolute flex justify-center items-center z-20 top-0 mb-2">
          <img src="image/assets/coin.png" alt="" className=" w-14 h-14" />
          <h1
            className=" text-[46px] text-white font-bold"
            style={{ fontFamily: " archivo" }}
          >
            {formatNumberWithCommas(token)}
          </h1>
        </div>
        <div ref={bodyRef} className="absolute bottom-[-10%] w-auto h-full z-50">
          <img
            className={` rounded-full w-auto h-full  ${remainedEnergy > 0
              ? "cursor-pointer"
              : " opacity-50 "
              } ${imgStatus ? " border border-transparent" : ""}`}
            src="/image/tap-image/cashtree.png"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full gap-2">
        <div className="flex flex-col justify-center items-center content-center w-full">
          <div className="flex justify-between w-full items-center px-3">
            <div className=" my-2 w-[fit-content] flex justify-center items-center gap-1">
              <img
                src="/image/assets/energy_home.png"
                alt="lightning"
                className="w-8 h-8 inline"
              />
              <p className="text-[16px] text-white">
                {remainedEnergy} &#8725; {limit}
              </p>
            </div>
            <div className=" my-2 w-[fit-content] flex justify-center items-center gap-1" onClick={handleBoost}>
              <img
                src="/image/assets/boost.png"
                alt="lightning"
                className="w-8 h-8 inline"
              />
              <p className="text-[16px] text-[#F7BB12]">
                Boost
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
