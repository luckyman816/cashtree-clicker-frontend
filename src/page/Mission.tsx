// import axios from "../utils/api";
import { useSelector, dispatch } from "../store";
import { updateBalance, updateDailyCoins,updateEnergy,updateTapLevel,updateLimit } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import toast, { Toaster,useToasterStore  } from "react-hot-toast";
import Modal from "../component/modal";
import moment from "moment";
import Footer from "../component/Footer";
import "../App.css";
import {
  getDailyCoinsReceivedStatus,
  updateDailyCoinsReceivedStatus,
  updateDailyTaskStatus,
  updateTaskListStatus,
} from "../store/reducers/dailyCoins";
import { dailyCheckItems, taskListItems, dailyCoins, levelTargets, energyLimit } from "../data";
import "../css/font.css";
import "react-toastify/dist/ReactToastify.css";


interface daily_coins_received_status_types {
  day_1: boolean;
  day_2: boolean;
  day_3: boolean;
  day_4: boolean;
  day_5: boolean;
  day_6: boolean;
  day_7: boolean;
}
interface mission_status_types {
  day: Date;
  status: boolean;
}
interface task_status_types {
  status: boolean;
  earned: boolean;
}

const TOAST_LIMIT = 1;

const retweetTwitterLink = "https://x.com/cashtreeglobal";
const commentMediumLink = "https://medium.com/@CashtreeGlobal";
const likePostLink = "https://medium.com/@CashtreeGlobal";
const followInstagramLink = "https://www.instagram.com/cashtree_app/";
const subscribeYoutubeLink = "https://www.youtube.com/@CashtreeOfficial";
const telegramGroupLink = "https://t.me/CashtreeOfficialCommunity";
export default function Mission() {
  
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const [balance, setBalance] = useState<number>(balance_state);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [tapLevel, setTapLevel] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(5000);
  const [limit, setLimit] = useState<number>(0);


  const user = useSelector((state) => state.wallet.user);

  useEffect(() => {
    for (let i: number = 0; i < levelTargets.length; i++) {
      if (user.balance < levelTargets[i]) {
        dispatch(updateTapLevel(username, i));
        dispatch(updateLimit(username, energyLimit[i - 1]));
        setTapLevel(i);
        setLimit(energyLimit[i - 1]);
        break;
      }
    }
    console.log('====================================');
    console.log('user.balance', user.balance);
    console.log('Index', limit);
    console.log('tap_level', tapLevel);
    console.log('====================================');
    setRemainedEnergy(user.energy);
  },[])

  useEffect(() => {
    if (tapLevel != 0) {
      const interval = setInterval(() => {
        if (username && remainedEnergy < limit) {
          dispatch(updateEnergy(username, remainedEnergy + tapLevel));
          setRemainedEnergy(remainedEnergy + tapLevel);
        }
        // if (remainedEnergy > limit) {
        //   dispatch(updateEnergy(username, limit));
        //   setRemainedEnergy(limit);
        // }
      // }, (11 - tapLevel) * 1000);
      },  1000);
      return () => clearInterval(interval);
    }
  }, [username, remainedEnergy, limit, tapLevel]);

  const { toasts } = useToasterStore();

  useEffect(() => {
    
    if (toasts.length > TOAST_LIMIT) {
      const excessToasts = toasts.slice(0, toasts.length - TOAST_LIMIT);
      excessToasts.forEach(t => toast.dismiss(t.id));
    }
  }, [toasts]);

  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  //-------------------------Get the Daily Coins Modal Function----------------------//
  const daily_coins_state = useSelector(
    (state) => state.wallet.user?.daily_coins
  );
  const daily_coins_received_status_state = useSelector(
    (state) => state.dailyCoins.daily_coins_received_status
  );
  const [daily_coins, setDailyCoins] = useState<moment.Moment | null>(
    daily_coins_state ? moment(daily_coins_state) : null
  );
  const [daily_coins_received_status, setDailyCoinsReceivedStatus] =
    useState<daily_coins_received_status_types>(
      daily_coins_received_status_state
    );

  const [diffDays, setDiffDays] = useState<number>(0);
  const [diffHours, setDiffHours] = useState<number>(0);
  const [diffMinutes, setDiffMinutes] = useState<number>(0);
  const [diffSeconds, setDiffSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateDifference(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const calculateDifference = (currentDateTime: moment.Moment) => {
    if (daily_coins) {
      const dateDiff = daily_coins
        ? currentDateTime.diff(daily_coins, "seconds")
        : 0;
      for(let i = 1; i <= 7; i++) {
        if(getDailyCoinsReceivedStatusByIndex(i)===false&&getDailyCoinsReceivedStatusByIndex(i-1)===true) {
          setDiffDays(Math.floor(dateDiff / (60 * 60 * 24)) - i + 1);

        }
      }
      setDiffHours(Math.floor((dateDiff % (60 * 60 * 24)) / (60 * 60)));
      setDiffMinutes(Math.floor((dateDiff % (60 * 60)) / 60));
      setDiffSeconds(Math.floor(dateDiff % 60));
    }
  };
  console.log(
    `${moment()} ${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`
  );
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const handleOpenReceiveModal = () => {
    setIsReceiveModalOpen(true);
    setIsDailyReward(false);
  };
  const handleCloseReceiveModal = () => {
    setIsReceiveModalOpen(false);
  };
  const getDailyCoinsReceivedStatusByIndex = (index: number) => {
    switch (index) {
      case 1:
        return daily_coins_received_status.day_1;
        break;
      case 2:
        return daily_coins_received_status.day_2;
        break;
      case 3:
        return daily_coins_received_status.day_3;
        break;
      case 4:
        return daily_coins_received_status.day_4;
        break;
      case 5:
        return daily_coins_received_status.day_5;
        break;
      case 6:
        return daily_coins_received_status.day_6;
        break;
      case 7:
        return daily_coins_received_status.day_7;
        break;
      default:
        return true;
        break;
    }
  };
  const handleReceiveDailyCoins = () => {
    if (diffDays === 1) {
      if (daily_coins_received_status.day_1 === false) {
        dispatch(updateBalance(username, balance + 500)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 1", true));
          toast.success("You have received " + 500 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_1 &&
        !daily_coins_received_status.day_2
      ) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 2", true));
          toast.success("You have received " + 1000 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_2 &&
        !daily_coins_received_status.day_3
      ) {
        dispatch(updateBalance(username, balance + 2000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 3", true));
          toast.success("You have received " + 2000 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_3 &&
        !daily_coins_received_status.day_4
      ) {
        dispatch(updateBalance(username, balance + 3000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 4", true));
          toast.success("You have received " + 3000 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_4 &&
        !daily_coins_received_status.day_5
      ) {
        dispatch(updateBalance(username, balance + 4000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 5", true));
          toast.success("You have received " + 4000 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_5 &&
        !daily_coins_received_status.day_6
      ) {
        dispatch(updateBalance(username, balance + 5000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 6", true));
          toast.success("You have received " + 5000 + " coins!", {duration: 3000});
        });
      } else if (
        daily_coins_received_status.day_6 &&
        !daily_coins_received_status.day_7
      ) {
        dispatch(updateBalance(username, balance + 10000)).then(() => {
          dispatch(updateDailyCoinsReceivedStatus(username, "Day 7", true));
          toast.success("You have received " + 10000 + " coins!", {duration: 3000});
        });
      }
      dispatch(updateDailyCoins(username, moment())).then(() => {
        setIsReceiveModalOpen(false);
      });

    } else if (diffDays > 1) {
      toast.error("The time has already passed! Plesae reset daily coins!", {duration: 3000});
    } else if (diffDays === 0) {
      toast.error("Please wait for the next day!", {duration: 3000});
    }
  };
  const handleResetDailyCoins = () => {
    dispatch(updateDailyCoins(username, moment())).then(() => {
      toast.success("The time is reset ", {duration: 3000});
      setIsReceiveModalOpen(false);
    });
  };
  useEffect(() => {
    if (username) {
      dispatch(getDailyCoinsReceivedStatus(username));
    }
  }, []);
  useEffect(() => {
    setDailyCoinsReceivedStatus(daily_coins_received_status_state);
  }, [daily_coins_received_status_state, setDailyCoinsReceivedStatus]);
  console.log("dailyCoinsReceivedStatus------->", daily_coins_received_status);
  //------------------------------------------------------------------------------//
  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
    setDailyCoins(daily_coins_state ? moment(daily_coins_state) : null);
  }, [username_state, balance_state, daily_coins_state, setDailyCoins]);
  //-----------------------Mission complete status-------------------------------//
  const retweet_status_state = useSelector(
    (state) => state.dailyCoins?.retweet_status
  );
  const comment_status_state = useSelector(
    (state) => state.dailyCoins?.comment_status
  );
  const like_status_state = useSelector(
    (state) => state.dailyCoins?.like_status
  );
  const instagram_status_state = useSelector(
    (state) => state.dailyCoins?.instagram_status
  );
  const youtube_status_state = useSelector(
    (state) => state.dailyCoins?.youtube_status
  );
  const telegram_status_state = useSelector(
    (state) => state.dailyCoins?.telegram_status
  );
  const [retweet_status, setRetweetStatus] =
    useState<mission_status_types>(retweet_status_state);
  const [comment_status, setCommentStatus] =
    useState<mission_status_types>(comment_status_state);
  const [like_status, setLikeStatus] =
    useState<mission_status_types>(like_status_state);
  const [instagram_status, setInstagramStatus] = useState<task_status_types>(
    instagram_status_state
  );
  const [youtube_status, setYoutubeStatus] =
    useState<task_status_types>(youtube_status_state);
  const [telegram_status, setTelegramStatus] = useState<task_status_types>(
    telegram_status_state
  );
  useEffect(() => {
    setRetweetStatus(retweet_status_state);
    setCommentStatus(comment_status_state);
    setLikeStatus(like_status_state);
    setInstagramStatus(instagram_status_state);
    setYoutubeStatus(youtube_status_state);
    setTelegramStatus(telegram_status_state);
  }, [
    retweet_status_state,
    comment_status_state,
    like_status_state,
    instagram_status_state,
    youtube_status_state,
    telegram_status_state,
  ]);
  const handleJoinRetweetTwitter = () => {
    if (moment().diff(retweet_status.day, "seconds") / (60 * 60 * 24) > 0) {
      window.open(retweetTwitterLink, "_blank");
      dispatch(updateDailyTaskStatus(username, "retweet", moment(), true));
    } else {
      toast.error("Please wait for the next day!", {duration: 3000});
    }
  };
  const handleCheckRetweetTwitter = () => {
    if (retweet_status.status) {
      dispatch(updateBalance(username, balance + 500)).then(() => {
        dispatch(updateDailyTaskStatus(username, "retweet", moment(), false));
        toast.success("You have received " + 500 + " coins!", {duration: 3000});
      });
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const handleJoinCommentMedium = () => {
    if (moment().diff(comment_status.day, "seconds") / (60 * 60 * 24) > 0) {
      window.open(commentMediumLink, "_blank");
      dispatch(updateDailyTaskStatus(username, "comment", moment(), true));
    } else {
      toast.error("Please wait for the next day!", {duration: 3000});
    }
  };
  const handleCheckCommentMedium = () => {
    if (comment_status.status) {
      dispatch(updateBalance(username, balance + 1000)).then(() => {
        dispatch(updateDailyTaskStatus(username, "comment", moment(), false));
        toast.success("You have received " + 1000 + " coins!", {duration: 3000});
      });
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const handleJoinLikePost = () => {
    if (moment().diff(comment_status.day, "seconds") / (60 * 60 * 24) > 0) {
      window.open(likePostLink, "_blank");
      dispatch(updateDailyTaskStatus(username, "like", moment(), true));
    } else {
      toast.error("Please wait for the next day!", {duration: 3000});
    }
  };
  const handleCheckLikePost = () => {
    if (like_status.status) {
      dispatch(updateBalance(username, balance + 2000)).then(() => {
        dispatch(updateDailyTaskStatus(username, "like", moment(), false));
        toast.success("You have received " + 2000 + " coins!", {duration: 3000});
      });
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const handleJoinInstagram = () => {
    window.open(followInstagramLink, "_blank");
    dispatch(updateTaskListStatus(username, "instagram", true, true));
  };
  const handleCheckInstagram = () => {
    if (instagram_status.status) {
      if (!instagram_status.earned) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          toast.success("You have received " + 1000 + " coins!", {duration: 3000});
        });
      } else {
        toast.error("You have already received!", {duration: 3000});
      }
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const handleJoinYoutube = () => {
    window.open(subscribeYoutubeLink, "_blank");
    dispatch(updateTaskListStatus(username, "youtube", true, true));
  };
  const handleCheckYoutube = () => {
    if (youtube_status.status) {
      if (!youtube_status.earned) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          toast.success("You have received " + 1000 + " coins!", {duration: 3000});
        });
      } else {
        toast.error("You have already received!", {duration: 3000});
      }
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const handleJoinTelegramGroup = () => {
    window.open(telegramGroupLink, "_blank");
    dispatch(updateTaskListStatus(username, "telegram", true, true));
  };
  const handleCheckTelegramGroup = () => {
    if (telegram_status.status) {
      if (telegram_status.earned) {
        dispatch(updateBalance(username, balance + 1000)).then(() => {
          toast.success("You have received " + 1000 + " coins!", {duration: 3000});
        });
      } else {
        toast.error("You have already received!", {duration: 3000});
      }
    } else {
      toast.error("Please join!", {duration: 3000});
    }
  };
  const [isDailyReward, setIsDailyReward] = useState<boolean>(false);
  const [isRetweetModal, setIsRetweetModal] = useState<boolean>(false);
  const [isCommentModal, setIsCommentModal] = useState<boolean>(false);
  const [isLikeModal, setIsLikeModal] = useState<boolean>(false);
  const [isInstagram, setIsInstagram] = useState<boolean>(false);
  const [isYoutube, setIsYoutube] = useState<boolean>(false);
  const [isTelegramGroupModal, setIsTelegramGroupModal] =
    useState<boolean>(false);
  const [isSecretExtra, setIsSecretExtra] = useState<boolean>(false);
  //----------------------Close Personal Modal------------------------------//
  const handleCloseDailyRewardModal = () => {
    setIsDailyReward(false);
  };
  const handleCloseRetweetModal = () => {
    setIsRetweetModal(false);
  };
  const handleCloseCommentModal = () => {
    setIsCommentModal(false);
  };
  const handleCloseLikeModal = () => {
    setIsLikeModal(false);
  };
  const handleCloseTelegramGroupModal = () => {
    setIsTelegramGroupModal(false);
  };
  const handleCloseInstagramModal = () => {
    setIsInstagram(false);
  };
  const handleCloseYoutubeModal = () => {
    setIsYoutube(false);
  };
  const handleCloseSecretExtraModal = () => {
    setIsSecretExtra(false);
  };
  //------------------------Daily Task and Task List Modal Open ---------------------------//
  const handleOpenDailyTaskModal = (modalName: string) => {
    if (modalName === "dailyCheck") {
      setIsDailyReward(true);
    } else if (modalName === "retweet") {
      setIsRetweetModal(true);
    } else if (modalName === "comment") {
      setIsCommentModal(true);
    } else if (modalName === "likePost") {
      setIsLikeModal(true);
    } else if (modalName === "secretExtra") {
      setIsSecretExtra(true);
    }
  };
  const handleOpenTaskListModal = (modalName: string) => {
    if (modalName == "instagram") {
      setIsInstagram(true);
    } else if (modalName == "youtube") {
      setIsYoutube(true);
    } else if (modalName == "telegram") {
      setIsTelegramGroupModal(true);
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <Toaster
      toastOptions={{
        className: 'w-full rounded-[20px] fade-toast',
        success: {
          className:' w-full rounded-[20px] fade-toast',
          style: {
            position:"absolute",
            top:"180px",
            left:"0%",
            // animation:"ease-in .5s",
            // transition: 'opacity 0.5s ease-in-out',
            animationName:"toaster",
            animationDuration: "5s",
            border:"none",
            borderRadius:"20px",
            background: "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
          },
        },
        error: {
          className:'w-full rounded-[20px] fade-toast',
          style: {
            position:"absolute",
            top:"180px",
            left:"0%",
            // animation:'ease-in .5s',
            // transition: 'opacity 0.5s ease-in-out',
            animationName:"toaster",
            animationDuration: "5s",
            border:"none",
            borderRadius:"20px",
            background: "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
          },
          
        },
      }}     
      />
      <div className="flex flex-col justify-center items-center gap-[30px] w-full mt-8">
        <div className="flex flex-col justify-center items-center">
          <img
            src="image/assets/mission.png"
            alt="mission"
            className=" w-[180px] h-[180px]"
          />
          <h1
            className="text-white text-[32px] font-bold"
            style={{ fontFamily: "archivo" }}
          >
            Earn More Coins
          </h1>
        </div>
        <div className=" overflow-y-auto w-full max-h-[50vh]">
          <div className="flex flex-col justify-center items-center w-full">
            <div
              className={`flex w-[90%] px-3 py-3 items-center justify-between bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#4756E5] to-[#47C8FF] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2 border-none`}
              onClick={() => handleOpenDailyTaskModal("secretExtra")}
            >
              <div className="flex justify-center items-center gap-3">
                <img
                  src={`/image/mission/secretExtra.png`}
                  alt=""
                  className="w-10 h-10"
                />
                <div className="flex flex-col gap-1 justify-start items-center">
                  <h3 className="text-base text-white">Redeem Secret Code</h3>
                </div>
              </div>
              <img
                src="/image/icon/arrowRight.png"
                alt="arrowRight"
                className="w-2 h-4"
              />
            </div>
            <div className="flex justify-start mb-[14px] mt-[30px] items-center w-[90%] text-white text-xl font-bold">
              Daily Task
            </div>
            {dailyCheckItems.map((item, index) => (
              <div
                key={index}
                className={`w-[90%] my-[6px] p-[1px] rounded-[20px]`}
                style={{
                  background:
                    "linear-gradient(340deg,rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.4)",
                }}
              >
                <div
                  className={`flex w-full px-3 py-3 items-center justify-between bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#240C4D] to-[#8137F9] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2 border-none`}
                  onClick={() => handleOpenDailyTaskModal(item.icon)}
                >
                  <div className="flex justify-center items-center gap-3">
                    <img
                      src={`/image/mission/${item.icon}.png`}
                      alt=""
                      className="w-10 h-10"
                    />
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-[13px] text-white leading-[18px]">
                        {item.name}
                      </h3>
                      <div className="flex justify-center items-center">
                        <div className="w-[21px] h-[21px] flex justify-start items-center">
                          <img
                            src="/image/assets/coin.png"
                            alt="coin"
                            className="w-4 h-4 translate-y-[2px]"
                          />
                        </div>
                        <h3 className="text-[14px] leading-[21px] text-white font-bold">
                          +{formatNumberWithCommas(25000)}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <img
                    src="/image/icon/arrowRight.png"
                    alt="arrowRight"
                    className="w-2 h-4"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-start mb-[14px] mt-[24px] items-center w-[90%] text-white text-xl font-bold">
              Task List
            </div>
            {taskListItems.map((item, index) => (
              <div
                key={index}
                className={`w-[90%] my-[6px] p-[1px] rounded-[20px]`}
                style={{
                  background:
                    "linear-gradient(340deg,rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.4)",
                }}
              >
                <div
                  className={`flex w-full px-3 py-3 items-center justify-between bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#240C4D] to-[#8137F9] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2 border-none`}
                  onClick={() => handleOpenTaskListModal(item.icon)}
                >
                  <div className="flex justify-center items-center gap-3">
                    <img
                      src={`/image/mission/${item.icon}.png`}
                      alt=""
                      className="w-10 h-10 translate-y-[2px]"
                    />
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-[13px] text-white leading-[18px]">
                        {item.name}
                      </h3>
                      <div className="flex justify-center items-center">
                        <div className="w-[21px] h-[21px] flex justify-start items-center">
                          <div className="w-[21px] h-[21px] flex justify-start items-center">
                            <img
                              src="/image/assets/coin.png"
                              alt="coin"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                        <h3 className="text-[14px] leading-[21px] text-white font-bold">
                          {item.coin}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <img
                    src="/image/icon/arrowRight.png"
                    alt="arrowRight"
                    className="w-2 h-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={isReceiveModalOpen} onClose={handleCloseReceiveModal}>
        <div className="flex flex-col items-center align-middle gap-[20px] px-3 py-3 w-full">
          <img
            src="image/assets/sand-timer.png"
            alt=""
            className=" w-12 h-12"
          />
          <div>
            <h1 className="text-2xl text-white">Daily Coins</h1>
            <p className=" text-sm text-white">You can get the Daily Coins!</p>
          </div>
          <h2 className=" text-xl text-white">
            Remaining Time:{" "}
            <span className="text-2xl text-[red]">{diffDays}</span> &nbsp;d{" "}
            <span className="text-2xl text-[green]">{diffHours}</span> &nbsp;h{" "}
            <span className="text-2xl text-[yellow]">{diffMinutes}</span>{" "}
            &nbsp;m <span className="text-2xl text-[white]">{diffSeconds}</span>{" "}
            &nbsp;s
          </h2>

          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleReceiveDailyCoins}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Receive Daily Points
              </span>
            </div>
          </div>

          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleResetDailyCoins}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Reset Daily Points
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isDailyReward} onClose={handleCloseDailyRewardModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
          <img
            src="image/mission/dailyRewardModal.png"
            alt="dailyRewardModal"
            className=" w-auto h-[200px]"
          />
          <div>
            <h1 className="text-2xl text-white font-bold">Daily Reward</h1>
            <p className=" text-sm text-white px-9">
              Accrue coins for logging into the game daily without skipping
            </p>
          </div>
          <div className="flex justify-center items-center w-full mt-[8px]">
            <div className="flex gap-[10px] w-[95%] flex-wrap h-auto">
              {dailyCoins.map((item, index) => (
                <div
                  key={index}
                  className={`w-[22%] p-[${
                    getDailyCoinsReceivedStatusByIndex(index + 1)
                      ? `0px`
                      : `1px`
                  }] rounded-[10px]`}
                  style={{
                    background:
                      "linear-gradient(340deg,rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <div
                    className={`flex flex-col w-full h-[84px] gap-1 py-1 px-3 justify-center items-center rounded-[10px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] ${
                      getDailyCoinsReceivedStatusByIndex(index + 1)
                        ? `from-[#692df5] to-[#a546ff]`
                        : (diffDays === 1 && getDailyCoinsReceivedStatusByIndex(index))
                        ? `from-[#4756E5] to-[#47C8FF]`
                        : `from-[#51229D] to-[#51229D]`
                    }`}
                  >
                    <h1 className="text-sm text-white font-bold">{item.day}</h1>
                    {getDailyCoinsReceivedStatusByIndex(index + 1) ? (
                      <img
                        src="image/mission/received.png"
                        alt="coin"
                        className="w-8 h-8"
                      />
                    ) : (
                      <img
                        src="image/assets/coin.png"
                        alt="coin"
                        className="w-8 h-8"
                      />
                    )}
                    <h1 className="text-sm text-white font-bold">
                      {item.points}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-[15px] w-full h-[56px] mt-[18px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleOpenReceiveModal}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Claim Now
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isRetweetModal} onClose={handleCloseRetweetModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/assets/mission.png"
            alt=""
            className=" w-auto h-[200px]"
          />
          <h1 className="text-2xl text-white">Retweet a Post</h1>
          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinRetweetTwitter}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Join Now
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckRetweetTwitter}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isCommentModal} onClose={handleCloseCommentModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/assets/mission.png"
            alt=""
            className=" w-auto h-[200px]"
          />
          <h1 className="text-2xl text-white">Comment on a Post</h1>

          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinCommentMedium}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Join Now
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckCommentMedium}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isLikeModal} onClose={handleCloseLikeModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/assets/mission.png"
            alt=""
            className=" w-auto h-[200px]"
          />
          <h1 className="text-2xl text-white">Like a Post</h1>

          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinLikePost}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Join Now
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckLikePost}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isSecretExtra} onClose={handleCloseSecretExtraModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/mission/secretExtraModal.png"
            alt="secretExtraModal"
            className=" w-auto h-[200px]"
          />
          <div>
            <h1 className="text-2xl text-white">Secret Extra Point</h1>
            <p className=" text-sm text-white">Enter your secret code</p>
          </div>
          <div className="w-[80%] bg-[white] flex justify-center items-center rounded-[20px] px-3 py-4 mt-[20px]">
            <input
              type="text"
              className="bg-white outline-none border-none w-[90%] text-[gray]"
              placeholder="Enter code here"
            />
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3">
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isInstagram} onClose={handleCloseInstagramModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full ">
          <img
            src="image/mission/instagramModal.png"
            alt="instagramModal"
            className=" w-auto h-[200px]"
          />
          <h1 className="text-2xl text-white">Follow our Instagram Channel</h1>

          <div className="px-[15px] w-full h-[56px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinInstagram}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Join Now
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckInstagram}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isYoutube} onClose={handleCloseYoutubeModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/mission/youtubeModal.png"
            alt="youtubeModal"
            className=" w-auto h-[200px]"
          />
          <div>
            <h1 className="text-2xl text-white">The trend you can't Ignore</h1>
            <p className=" text-sm text-white">
              Trump's crypto frenzy, over 1 million meme coins and false crypto
              promise
            </p>
          </div>

          <div className="px-[15px] w-full h-[56px] ">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinYoutube}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Watch Video
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckYoutube}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isTelegramGroupModal}
        onClose={handleCloseTelegramGroupModal}
      >
        <div className="flex flex-col items-center align-middle justify-center gap-[20px] w-full">
          <img
            src="image/mission/instagramModal.png"
            alt="instagramModal"
            className=" w-auto h-[200px]"
          />
          <h1 className="text-2xl text-white">Join Our Telegram Group</h1>

          <div className="px-[15px] w-full h-[56px] ">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleJoinTelegramGroup}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Join Now
              </span>
            </div>
          </div>

          <div className="flex gap-2 justify-center items-center">
            <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-2xl text-white font-bold">+25.000</h1>
          </div>

          <div className="px-[15px] w-full h-[56px] mb-[10px]">
            <div
              className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
              onClick={handleCheckTelegramGroup}
            >
              <span className="flex justify-center items-center text-white text-xl">
                Check
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
