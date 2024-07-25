// import axios from "../utils/api";
import { useSelector, dispatch } from "../store";
import { updateBalance, updateDailyCoins } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../component/modal";
import moment from "moment";
import Footer from "../component/Footer";
const dailyCheckItems = [
  {
    id: 1,
    icon: "dailyCheck",
    name: "Daily Check in!",
    coin: "+25.000"
  },
  {
    id: 2,
    icon: "retweet",
    name: "Retweet a Post",
    coin: "+25.000"
  },
  {
    id: 3,
    icon: "comment",
    name: "Comment on a Post",
    coin: "+25.000"
  },
  {
    id: 4,
    icon: "likePost",
    name: "Like a Post",
    coin: "+25.000"
  },
  {
    id: 5,
    icon: "secretExtra",
    name: "Secret Extra Point",
    coin: "+25.000"
  },
]
const taskListItems = [
  {
    id: 1,
    icon: "instagram",
    name: "Follow Instagram",
    coin: "+25.000"
  },
  {
    id: 1,
    icon: "youtube",
    name: "Subscribe to YouTube",
    coin: "+25.000"
  },
  {
    id: 1,
    icon: "telegram",
    name: "Join Telegram Group",
    coin: "+25.000"
  }
]
const dailyCoins = [
  {
    day: "Day 1",
    points: "500"
  },
  {
    day: "Day 2",
    points: "1000"
  },
  {
    day: "Day 3",
    points: "2000"
  },
  {
    day: "Day 4",
    points: "3000"
  },
  {
    day: "Day 5",
    points: "4000"
  },
  {
    day: "Day 6",
    points: "5000"
  }
]
export default function Mission() {
  // const [colorTag, setColorTag] = useState<boolean>(false);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const daily_coins_state = useSelector(
    (state) => state.wallet.user?.daily_coins
  );
  const [username, setUsername] = useState<string>(username_state);
  const [balance, setBalance] = useState<number>(balance_state);
  const [daily_coins, setDailyCoins] = useState<moment.Moment | null>(
    daily_coins_state ? moment(daily_coins_state) : null
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
      setDiffDays(Math.floor(dateDiff / (60 * 60 * 24)));
      setDiffHours(Math.floor((dateDiff % (60 * 60 * 24)) / (60 * 60)));
      setDiffMinutes(Math.floor((dateDiff % (60 * 60)) / 60));
      setDiffSeconds(Math.floor(dateDiff % 60));
    }
  };
  console.log(
    `${moment()} ${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`
  );
  useEffect(() => {
    setUsername(username_state);
    setBalance(balance_state);
    setDailyCoins(daily_coins_state ? moment(daily_coins_state) : null);
  }, [username_state, balance_state, daily_coins_state, setDailyCoins]);
  // const telegramGroupLink = "https://t.me/MikeToken";
  // const telegramChannelLink = "https://t.me/MikeTokenAnn";
  // const twitterChannelLink = "https://twitter.com/MikeTokenio";
  // const handleLetsGoTelegramGroup = () => {
  //   window.open(telegramGroupLink, "_blank");
  // };
  // const handleJoinTelgramGroup = () => {
  //   window.open(telegramGroupLink, "_blank");
  // };
  // const handleJoinTelegramChannel = () => {
  //   window.open(telegramChannelLink, "_blank");
  // };
  // const handleTwitterChannel = () => {
  //   window.open(twitterChannelLink, "_blank");
  // };
  // const handleJoinTelegramGroupCheck = async () => {
  //   try {
  //     fetch("https://relaxing-dane-lively.ngrok-free.app/joinTG", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ username: username }),
  //     }).then(async () => {
  //       await axios.post(`/earnings/${username}`).then((res) => {
  //         if (res.data.joinTelegram.status) {
  //           if (!res.data.joinTelegram.earned) {
  //             dispatch(updateBalance(username, balance + 1000)).then(() => {
  //               axios.post(`/earnings/update/joinTelegram/${username}`, {
  //                 status: true,
  //                 earned: true,
  //               });
  //               toast.success("You have received +1000 coins successfully!");
  //             });
  //           } else {
  //             toast.warning("You have already received bonus!");
  //           }
  //         } else {
  //           toast.warning(
  //             "You didn't join Telegram Channel yet! Please join again"
  //           );
  //         }
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleSubscribeTelegramChannelCheck = async () => {
  //   try {
  //     fetch("https://relaxing-dane-lively.ngrok-free.app/joinTC", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ username: username }),
  //     }).then(async () => {
  //       await axios.post(`/earnings/${username}`).then((res) => {
  //         if (res.data.subscribeTelegram.status) {
  //           if (!res.data.subscribeTelegram.earned) {
  //             dispatch(updateBalance(username, balance + 1000)).then(() => {
  //               axios.post(`/earnings/update/subscribeTelegram/${username}`, {
  //                 status: true,
  //                 earned: true,
  //               });
  //               toast.success("You have received +1000 coins successfully!");
  //             });
  //           } else {
  //             toast.warning("You have already received bonus!");
  //           }
  //         } else {
  //           toast.warning(
  //             "You didn't subscribe Telegram Channel yet! Please join again"
  //           );
  //         }
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const handleTwitterChannelCheck = async () => {
  //   await axios.post(`/earnings/${username}`).then((res) => {
  //     if (!res.data.followTwitter.earned) {
  //       dispatch(updateBalance(username, balance + 1000)).then(() => {
  //         axios.post(`/earnings/update/followTwitter/${username}`, {
  //           status: true,
  //           earned: true,
  //         });
  //         toast.success("You have received +1000 coins successfully!");
  //       });
  //     } else {
  //       toast.warning("You have already received bonus!");
  //     }
  //   });
  // };

  // const handleDailyTask = () => {
  //   setColorTag(!colorTag);
  // };
  // const handleOtherTask = () => {
  //   setColorTag(!colorTag);
  // };
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  // const handleOpenReceiveModal = () => {
  //   setIsReceiveModalOpen(true);
  // };
  const handleCloseReceiveModal = () => {
    setIsReceiveModalOpen(false);
  };
  const receivedCoins = () => {
    if (diffDays > 0) {
      dispatch(updateBalance(username, balance + diffDays * 1000)).then(() => {
        dispatch(updateDailyCoins(username, moment())).then(() => {
          toast.success("You have received " + diffDays * 1000 + " coins!");
          setIsReceiveModalOpen(false);
        });
      });
    } else {
      toast.warning("Please wait for the next day!");
    }
  };
  const [isDailyReward, setIsDailyReward] = useState<boolean>(false);
  const [isInstagram, setIsInstagram] = useState<boolean>(false);
  const [isYoutube, setIsYoutube] = useState<boolean>(false);
  const [isSecretExtra, setIsSecretExtra] = useState<boolean>(false);
  const handleCloseDailyRewardModal = () => {
    setIsDailyReward(false)
  }
  const handleCloseInstagramModal = () => {
    setIsInstagram(false);
  }
  const handleCloseYoutubeModal = () => {
    setIsYoutube(false);
  }
  const handleCloseSecretExtraModal = () => {
    setIsSecretExtra(false);
  }
  const handleOpenDailyTaskModal = (modalName: string) => {
    if (modalName === "dailyCheck") {
      setIsDailyReward(true);
    } else if(modalName === "secretExtra") {
      setIsSecretExtra(true);
    }
  }
  const handleOpenTaskListModal = (modalName: string) => {
    if (modalName == "instagram") {
      setIsInstagram(true);
    } else if (modalName == "youtube") {
      setIsYoutube(true);
    }
  }
  // const handleLetsGoTelegramGroupCheck = async () => {
  //   try {
  //     await axios.post(`/vibe/${username}`).then((res) => {
  //       if (
  //         Math.floor(
  //           moment().diff(res.data[0]["vibe_date"], "seconds") / (60 * 60 * 24)
  //         ) >= 1 &&
  //         res.data[0]["message"]
  //       ) {
  //         dispatch(updateBalance(username, balance + 1000)).then(() => {
  //           axios.post(`/vibe/updateVibe/${username}`, {
  //             vibe_date: moment(),
  //           });
  //           axios.post(`/vibe/updateMessage/${username}`, { message: false });
  //           toast.success("You have received +1000 coins successfully!");
  //         });
  //       } else {
  //         toast.warning("Did you post a vibe in Channel? \n Or please wait for 24 hours!");
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     toast.warning(" Please join Telegram Channel");
  //   }
  // };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-4 w-full mt-11">
          <div className="flex justify-between items-center px-3 w-full">
            <img src="image/icon/back.png" alt="" className=" w-4 h-4" />
            <h3
              className="text-sm text-[white]"
              style={{ fontFamily: "archivo" }}
            >
              Cashtree Tap to Win
            </h3>
            <img src="image/icon/menu.png" alt="" className=" w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src="image/assets/mission.png" alt="" className=" w-36 h-36" />
            <h1 className="text-white text-[32px] font-bold">Earn More Coins</h1>
          </div>
          <div className=" overflow-y-auto w-full max-h-[50vh]">
            <div className="flex flex-col justify-center items-center w-full gap-3">
              <div className="flex justify-start items-center w-[90%] text-white text-xl font-bold">Daily Task</div>
              {
                dailyCheckItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex w-[90%] my-3 px-5 py-3 items-center justify-between bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2 border border-[#B286FA]`}
                    onClick={() => handleOpenDailyTaskModal(item.icon)}>
                    <div className="flex justify-center items-center">
                      <img src={`/image/mission/${item.icon}.png`} alt="" className="w-10 h-10" />
                      <div className="flex flex-col gap-1 justify-start items-start">
                        <h3 className="text-lg text-white">{item.name}</h3>
                        <div className="flex justify-center items-center">
                          <img src="/image/assets/coin.png" alt="coin" className="w-4 h-4" />
                          <h3 className="text-sm text-white">
                            25.000
                          </h3>
                        </div>
                      </div>
                    </div>
                    <img src="/image/icon/arrowRight.png" alt="arrowRight" className="w-2 h-4" />
                  </div>
                ))
              }
              <div className="flex justify-start items-center w-[90%] text-white text-xl font-bold">Task List</div>
              {
                taskListItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex w-[90%] my-3 px-5 py-3 items-center justify-between bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2 border border-[#B286FA]`}
                    onClick={() => handleOpenTaskListModal(item.icon)}>
                    <div className="flex justify-center items-center">
                      <img src={`/image/mission/${item.icon}.png`} alt="" className="w-10 h-10" />
                      <div className="flex flex-col gap-1 justify-start items-start">
                        <h3 className="text-lg text-white">{item.name}</h3>
                        <div className="flex justify-center items-center">
                          <img src="/image/assets/coin.png" alt="coin" className="w-4 h-4" />
                          <h3 className="text-sm text-white">
                            {item.coin}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <img src="/image/icon/arrowRight.png" alt="arrowRight" className="w-2 h-4" />
                  </div>
                ))
              }
            </div>
          </div>

          {/* <div className="flex justify-center items-center w-[90%] h-11 rounded-[10px] bg-[#394A50]">
            <div
              className={`h-full cursor-pointer flex items-center justify-center w-[50%] text-[white] rounded-[10px] ${!colorTag
                  ? "bg-gradient-to-r from-[#8977C8] to-[#06E2F4]"
                  : "bg-[#394A50]"
                }`}
              onClick={handleDailyTask}
            >
              Daily Tasks
            </div>
            <div
              className={`h-full cursor-pointer flex items-center w-[50%] justify-center text-[white] rounded-[10px] ${colorTag
                  ? "bg-gradient-to-r from-[#8977C8] to-[#06E2F4]"
                  : "bg-[#394A50]"
                }`}
              onClick={handleOtherTask}
            >
              Other Tasks
            </div>
          </div>

          {!colorTag && (
            <div className="flex flex-col justify-center items-center w-[90%] rounded-[10px] bg-gradient-to-r from-[#556165] to-[#293135] p-3 gap-2">
              <h2
                className="text-[white] text-[xl]"
                style={{ fontFamily: "poppins" }}
              >
                Send your vibe to GTS TG group and earn some coins
              </h2>
              <div className="flex justify-center items-center  w-full gap-3">
                <button
                  className="bg-[#3C4648] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-[#33CC66] border-solid"
                  onClick={handleLetsGoTelegramGroup}
                >
                  Let's Go
                </button>
                <button
                  className="bg-[#33CC66] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-white border-solid"
                  onClick={handleLetsGoTelegramGroupCheck}
                >
                  Check
                </button>
              </div>
            </div>
          )}
          {!colorTag && (
            <div className="flex justify-center items-center w-[90%] rounded-[10px] bg-gradient-to-r from-[#556165] to-[#293135] p-3 gap-2">
              <h2
                className="text-[white] text-[xl]"
                style={{ fontFamily: "poppins" }}
              >
                Receive your daily coins
              </h2>
              <button
                className="bg-[#F8B219] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-white border-solid"
                onClick={handleOpenReceiveModal}
              >
                Receive
              </button>
            </div>
          )}
          {colorTag && (
            <div className="flex flex-col justify-center items-center gap-3 w-[90%]">
              <div className="flex flex-col justify-center items-center w-full rounded-[10px] bg-gradient-to-r from-[#556165] to-[#293135] p-3 gap-2">
                <h2
                  className="text-[white] text-[xl]"
                  style={{ fontFamily: "poppins" }}
                >
                  Join GTS TG Group
                </h2>
                <div className="flex justify-center items-center  w-full gap-3">
                  <button
                    className="bg-[#3C4648] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-[#33CC66] border-solid"
                    onClick={handleJoinTelgramGroup}
                  >
                    Join
                  </button>
                  <button
                    className="bg-[#33CC66] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-white border-solid"
                    onClick={handleJoinTelegramGroupCheck}
                  >
                    Check
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full rounded-[10px] bg-gradient-to-r from-[#556165] to-[#293135] p-3 gap-2">
                <h2
                  className="text-[white] text-[xl]"
                  style={{ fontFamily: "poppins" }}
                >
                  Subscribe GTS TC Channel
                </h2>
                <div className="flex justify-center items-center  w-full gap-3">
                  <button
                    className="bg-[#3C4648] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-[#33CC66] border-solid"
                    onClick={handleJoinTelegramChannel}
                  >
                    Join
                  </button>
                  <button
                    className="bg-[#33CC66] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-white border-solid"
                    onClick={handleSubscribeTelegramChannelCheck}
                  >
                    Check
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center w-full rounded-[10px] bg-gradient-to-r from-[#556165] to-[#293135] p-3 gap-2">
                <h2
                  className="text-[white] text-[xl]"
                  style={{ fontFamily: "poppins" }}
                >
                  Follow GTS Twitter
                </h2>
                <div className="flex justify-center items-center  w-full gap-3">
                  <button
                    className="bg-[#3C4648] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-[#33CC66] border-solid"
                    onClick={handleTwitterChannel}
                  >
                    Join
                  </button>
                  <button
                    className="bg-[#33CC66] text-[white] w-[40%] rounded-[10px] flex justify-center items-center text-[16px] gap-2 border-[1px] border-white border-solid"
                    onClick={handleTwitterChannelCheck}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
        <Footer />
        <Modal isOpen={isReceiveModalOpen} onClose={handleCloseReceiveModal}>
          <div className="flex flex-col items-center align-middle gap-3">
            <img
              src="image/assets/sand-timer.png"
              alt=""
              className=" w-12 h-12"
            />
            <h1 className="text-2xl text-white">Daily Coins</h1>
            <p className=" text-sm ngtext-white">You can get the Daily Coins!</p>
            <h2 className=" text-xl text-white">
              Remaining Time:{" "}
              <span className="text-2xl text-[red]">{diffDays}</span> &nbsp;d{" "}
              <span className="text-2xl text-[green]">{diffHours}</span> &nbsp;h{" "}
              <span className="text-2xl text-[yellow]">{diffMinutes}</span>{" "}
              &nbsp;m <span className="text-2xl text-[white]">{diffSeconds}</span>{" "}
              &nbsp;s
            </h2>
            <div
              className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center hover:bg-indigo-400"
              onClick={receivedCoins}
            >
              <span className="flex justify-center items-center">Receive</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isDailyReward} onClose={handleCloseDailyRewardModal}>
          <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
            <img src="image/mission/dailyRewardModal.png" alt="dailyRewardModal" className=" w-auto h-[80%]" />
            <h1 className="text-2xl text-white">Daily Reward</h1>
            <p className=" text-sm text-white">
              Accrue coins for logging into the game daily without skipping
            </p>
            <div className="flex gap-5 w-[90%] flex-wrap h-auto">
              {dailyCoins.map((item, index) => (
                <div key={index} className="flex flex-col gap-1 py-1 px-3 justify-center items-center border border-[#B286FA] rounded-[10px]">
                  <h1 className="text-sm text-white font-bold">{item.day}</h1>
                  <img src="image/assets/coin.png" alt="coin" className="w-8 h-8" />
                  <h1 className="text-sm text-white font-bold">{item.points}</h1>
                </div>
              ))}
            </div>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Claim Now</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isSecretExtra} onClose={handleCloseSecretExtraModal}>
          <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
            <img src="image/mission/secretExtraModal.png" alt="secretExtraModal" className=" w-auto h-[80%]" />
            <h1 className="text-2xl text-white">Secret Extra Point</h1>
            <p className=" text-sm text-white">
              Enter your secret code
            </p>
            <div className="w-[80%] bg-[white] flex justify-center items-center">
              <input type="text" className="bg-white outline-none border-none w-[90%]"/>
            </div>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Check</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isInstagram} onClose={handleCloseInstagramModal}>
          <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
            <img src="image/mission/instagramModal.png" alt="instagramModal" className=" w-auto h-[80%]" />
            <h1 className="text-2xl text-white">Follow our Instagram Channel</h1>
            <div className="flex gap-2 justify-center items-center">
              <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
              <h1 className="text-2xl text-white font-bold">+25.000</h1>
            </div>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Join Now</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isYoutube} onClose={handleCloseYoutubeModal}>
          <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
            <img src="image/mission/youtubeModal.png" alt="youtubeModal" className=" w-auto h-[80%]" />
            <h1 className="text-2xl text-white">The trend you can't Ignore</h1>
            <p className=" text-sm text-white">
              Trump's crypto frenzy, over 1 million meme coins and false crypto promise
            </p>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Watch Video</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <img src="image/assets/coin.png" alt="" className="w-12 h-12" />
              <h1 className="text-2xl text-white font-bold">+25.000</h1>
            </div>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Check</span>
            </div>
          </div>
        </Modal>

      </div>
    </>
  );
}
