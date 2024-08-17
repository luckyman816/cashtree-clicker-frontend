/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
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
  const user = useSelector((state) => state.wallet.user);
  const [imgStatus, setImgStatus] = useState(false);
  const [tapLevel, setTapLevel] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [hasRunEffect, setHasRunEffect] = useState(false);
  const [progressValue, setProgressValue] = useState<number>(
    token - levelTargets[tapLevel - 1]
  );
  const [targetDiff, setTargetDiff] = useState<number>(
    levelTargets[tapLevel] - levelTargets[tapLevel - 1]
  );
  useEffect(() => {
    setUserData();
  }, []);

  // useEffect(() => {
  //   for (let i: number = 0; i < levelTargets.length; i++) {
  //     if (token < levelTargets[i]) {
  //       dispatch(updateTapLevel(username, i));
  //       dispatch(updateLimit(username, energyLimit[i]));
  //       break;
  //     }
  //   }
  //   setTapLevel(user.tap_level);
  //   setLimit(user.limit);
  // });

  const setUserData = async () => {
    try {
      const webapp = (window as any).Telegram?.WebApp.initDataUnsafe;
      console.log("=========>webapp", webapp);
      if (webapp) {
        setUsername(webapp["user"]["username"]);
        await axios.post(`/vibe/add,`, {
          username: webapp["user"]["username"],
        });
        await axios.post(`/earnings/add`, {
          username: webapp["user"]["username"],
        });
        await dispatch(insertWallet(webapp["user"]["username"]));
        await dispatch(addDailyCoinsReceivedStatus(webapp["user"]["username"]));
        await dispatch(addDailyBoost(webapp["user"]["username"]));
        await dispatch(getWallet(webapp["user"]["username"]));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    for (let i: number = 0; i < levelTargets.length; i++) {
      if (user.balance < levelTargets[i]) {
        dispatch(updateTapLevel(username, i));
        dispatch(updateLimit(username, energyLimit[i]));
        setTapLevel(user.tap_level);
        setLimit(user.limit);
        break;
      }
    }
    console.log('====================================');
    console.log('user.tap_level[i]', user.tap_level);
    console.log('====================================');
  },[])
  useEffect(() => {
    if (user.tap_level != 0 && !hasRunEffect) {
      setToken(user.balance);
      // for (let i: number = 0; i < levelTargets.length; i++) {
      //   if (token < levelTargets[i]) {
      //     dispatch(updateTapLevel(username, i));
      //     dispatch(updateLimit(username, energyLimit[i]));
      //     break;
      //   }
      // }
      // setTapLevel(user.tap_level);
      // setLimit(user.limit);
      setRemainedEnergy(user.energy);
      setHasRunEffect(true); // Mark the effect as run
    }
  }, [user, hasRunEffect]);
  console.log("--user.balance--->", user.balance);
  useEffect(() => {
    setTargetDiff(levelTargets[tapLevel] - levelTargets[tapLevel - 1]);
    setProgressValue(token - levelTargets[tapLevel - 1]);
  }, [tapLevel, token]);
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
    newDiv.style.width = "46px";
    newDiv.style.height = "46px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = "white";
    newDiv.style.fontFamily = "archivo-bold";
    newDiv.style.zIndex = "30";
    newDiv.className =
      "animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 800);

    return () => clearTimeout(interval);
  };

  console.log(
    "progressValuebar",
    progressValue,
    (progressValue * 100) / targetDiff
  );

  useEffect(() => {
    if (tapLevel != 0) {
      const interval = setInterval(() => {
        if (username && remainedEnergy < limit) {
          dispatch(updateEnergy(username, remainedEnergy + tapLevel));
          setRemainedEnergy(remainedEnergy + tapLevel);
        }
        if (remainedEnergy > limit) {
          dispatch(updateEnergy(username, limit));
          setRemainedEnergy(limit);
        }
      }, (11 - tapLevel) * 1000);
      return () => clearInterval(interval);
    }
  }, [username, remainedEnergy, limit, tapLevel]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (remainedEnergy > 0 && token <= levelTargets[tapLevel]) {
      setScore(`+${tapLevel}`);
      console.log("---------------------------------->", tapLevel);
      console.log("---------------------------------->", limit);
      if (token + tapLevel > levelTargets[tapLevel]) {
        setToken(levelTargets[tapLevel]);
        setTapLevel(tapLevel + 1);
        setLimit(energyLimit[tapLevel + 1]);
        dispatch(
          updateWallet(
            username,
            levelTargets[tapLevel],
            remainedEnergy - tapLevel
          )
        ).then(() => {
          if (tapLevel < 10) {
            dispatch(updateTapLevel(username, tapLevel + 1)).then(() => {
              setTargetDiff(
                levelTargets[tapLevel] - levelTargets[tapLevel - 1]
              );
            });
            dispatch(
              updateBalance(username, token + levelBonus[tapLevel - 1])
            ).then(() => {
              setToken(token + levelBonus[tapLevel - 1]);
              toast.success("Level up! 🎉🎉🎉 You received bonus points!");
            });
            dispatch(updateLimit(username, energyLimit[tapLevel + 1]));
            setLimit(energyLimit[tapLevel + 1]);
          } else {
            toast.error("Maximum level reached!");
          }
        });
        setProgressValue(0);
      } else {
        setToken(token + tapLevel);
        setProgressValue((prevValue) => prevValue + 1);
        if (remainedEnergy - tapLevel < 0) {
          dispatch(updateWallet(username, token + tapLevel, 0));
          setRemainedEnergy(0);
        } else {
          dispatch(
            updateWallet(username, token + tapLevel, remainedEnergy - tapLevel)
          );
          setRemainedEnergy(remainedEnergy - tapLevel);
        }
      }
      handleClick(event);
    } else if (remainedEnergy - tapLevel <= 0) {
      toast.error("Not enough energy!");
    }
  };
  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  const handleBoost = () => {
    navigate("/boost");
  };
  const handleLevelUp = () => {
    navigate("/level");
  };
  console.log("imgStatus", imgStatus);
  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <Toaster />
      <div className="w-[90%] flex flex-col justify-center items-center gap-4 mt-12">
        <div className="flex justify-between items-center w-full px-3 py-1 bg-[linear-gradient(330deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7B34EF] rounded-[20px] border border-[#9165D6]">
          <div className=" flex justify-center items-center p-2 ">
            <img src="/image/assets/coin.webp" alt="" className=" w-11 h-11" />
            <div className="flex flex-col justify-center items-center">
              <h2 className=" text-[11px] text-[#FFC107]">Earn Per Tap</h2>
              <div className="flex justify-start items-center gap-1">
                <h3
                  className="text-sm text-[white]"
                  style={{ fontFamily: "archivo-bold" }}
                >
                  +{tapLevel} Poin
                </h3>
                <img src="/image/assets/info.webp" alt="" className="w-3 h-3" />
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[30px] bg-white"></div>
          <div className=" flex justify-center items-center p-2 ">
            <img
              src="/image/assets/earnLevel.webp"
              alt=""
              className=" w-11 h-11"
            />
            <div className="flex flex-col justify-center items-center">
              <h2 className=" text-[11px] text-[#FFC107]">Earn to level up</h2>
              <h3
                className="text-sm text-[white] font-bold"
                style={{ fontFamily: "archivo-bold" }}
              >
                +{formatNumberWithCommas(levelTargets[tapLevel])}k
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center p-3 gap-2">
        <ProgressBar value={(progressValue * 100) / targetDiff} />
        <div className="flex w-full justify-between items-center p-3">
          <h1
            className="text-[12px] text-white cursor-pointer"
            onClick={handleLevelUp}
          >
            Level: {levelNames[tapLevel - 1]} &nbsp; &#8250;
          </h1>
          <h1 className="text-[12px] text-white">{tapLevel}/10</h1>
        </div>
      </div>
      <div className="flex justify-center items-center relative h-[45vh] w-full">
        <img
          className="flex justify-center items-center absolute w-auto h-[92%] z-10 bg-cover bg-no-repeat bottom-[15%]"
          src="/image/tap-image/cashtree_bg.webp"
        ></img>
        <div className="absolute flex justify-center items-center z-20 top-0 mb-2 w-full">
          <img
            src="image/assets/coin.webp"
            alt=""
            className=" w-[15%] h-auto"
          />
          <h3
            className=" text-[46px] text-white"
            style={{ fontFamily: " archivo-bold" }}
          >
            {formatNumberWithCommas(token)}
          </h3>
        </div>
        <div
          ref={bodyRef}
          className={`absolute bottom-[-20%] w-auto h-full z-50 ${
            imgStatus ? " p-3" : ""
          }`}
          onClick={handleTap}
        >
          <img
            className={` rounded-full w-auto h-[85%] ${
              remainedEnergy > 0 ? "cursor-pointer" : " opacity-50 "
            } drop-shadow-[0_20px_50px_#9D3AFFCC]`}
            src="/image/tap-image/cashtree.webp"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full gap-2">
        <div className="flex flex-col justify-center items-center content-center w-full">
          <div className="flex justify-between w-full items-center px-3">
            <div className=" my-2 w-[fit-content] flex justify-center items-center gap-1">
              <img
                src="/image/assets/energy_home.webp"
                alt="lightning"
                className="w-8 h-8 inline"
              />
              <p className="text-[16px] text-white">
                {remainedEnergy} &#8725; {limit}
              </p>
            </div>
            <div
              className=" my-2 w-[fit-content] flex justify-center items-center gap-1"
              onClick={handleBoost}
            >
              <img
                src="/image/assets/boost.webp"
                alt="lightning"
                className="w-8 h-8 inline"
              />
              <p className="text-[16px] text-[#F7BB12]">Boost</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
