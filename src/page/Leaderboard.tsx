import Footer from "../component/Footer";
import { updateEnergy,updateTapLevel,updateLimit } from "../store/reducers/wallet";
import {  levelTargets, energyLimit } from "../data";
import toast, {  Toaster,useToasterStore  } from "react-hot-toast";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
import { milestones } from "../data";
import "../css/font.css";
import Modal from "../component/modal";

const TOAST_LIMIT = 1;

export default function Leaderboard() {
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const { toasts } = useToasterStore();

  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, ] = useState<string>(username_state);
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



  useEffect(() => {
    
    if (toasts.length > TOAST_LIMIT) {
      const excessToasts = toasts.slice(0, toasts.length - TOAST_LIMIT);
      excessToasts.forEach(t => toast.dismiss(t.id));
    }
  }, [toasts]);



  const players_state = useSelector((state) => state.wallet.users);
  const [players, setPlayers] = useState(players_state);
  useEffect(() => {
    dispatch(getAllUsers()).then(() => {
      setPlayers(players_state);
    });
  }, [players_state]);

  console.log("players----------->", players);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(0);
  const handleLeaderboardClick = () => {
    setIsLeaderboardOpen(0);
  };
  const handlePrizePoolClick = () => {
    setIsLeaderboardOpen(1);
  };
  const handleResultClick = () => {
    setIsLeaderboardOpen(2);
  };
  const [isMilestoneModal, setIsMilestoneModal] = useState<boolean>(false);
  const [milestone_number, setMilestoneNumber] = useState<number>(1);
  const handleCloseMilestoneModal = () => {
    setIsMilestoneModal(false);
  };
  const handleOpenMilestoneModal = (index: number) => {
    setMilestoneNumber(index);
    setIsMilestoneModal(true);
  };
  return (
    <div className="flex flex-col justify-between items-center h-full w-full bg-[linear-gradient(25deg,_var(--tw-gradient-stops))] from-[#3b1e6a] to-[#120F29]">
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
      <div className="p-5 flex flex-col justify-start items-center gap-[30px] w-full mt-8 relative">
        <div className="flex w-full h-8 bg-[#120F29] justify-start items-center border-b-2 border-[#3C375C]">
          <div
            className={`w-1/3 h-full text-sm translate-y-[2px]  ${
              isLeaderboardOpen == 0
                ? "text-[#7520FF] border-b-2 border-[#7520FF]"
                : "text-[#ABA7BA] "
            }`}
            style={{ fontFamily: "archivo-bold" }}
            onClick={() => handleLeaderboardClick()}
          >
            LEADERBOARD
          </div>
          <div
            className={`w-[30%] h-full text-sm translate-y-[2px] ${
              isLeaderboardOpen == 1
                ? "text-[#7520FF] border-b-2 border-[#7520FF]"
                : "text-[#ABA7BA] "
            }`}
            style={{ fontFamily: "archivo-bold" }}
            onClick={() => handlePrizePoolClick()}
          >
            PRIZE POOL
          </div>
          <div
            className={`w-[20%] h-full text-sm translate-y-[2px] ${
              isLeaderboardOpen == 2
                ? "text-[#7520FF] border-b-2 border-[#7520FF]"
                : "text-[#ABA7BA]"
            }`}
            style={{ fontFamily: "archivo-bold" }}
            onClick={() => handleResultClick()}
          >
            RESULT
          </div>
        </div>
        {isLeaderboardOpen == 0 ? (
          <div className="flex flex-col justify-start items-center gap-3 w-full min-h-[70vh] max-h-[70vh]">
            <div className="min-h-[50vh] max-h-[50vh] flex flex-col overflow-auto w-full gap-3">
              {players?.map((player, index) => (
                <div
                  key={index}
                  className="w-full h-[70px] flex justify-between items-center bg-[#332166] rounded-[12px] px-4 relative overflow-hidden"
                >
                  {index < 3 && (
                    <div className="w-[100px] h-[100px] z-0 absolute right-0 scale-110 skew-x-[162deg] translate-x-[37px] bg-[linear-gradient(5deg,_var(--tw-gradient-stops))] from-[#4517A8] to-[#D940FF]" />
                  )}
                  <div className="flex-[1.5] py-2 z-10">
                    <img
                      src="image/leaderboard/playerIcon.png"
                      alt=""
                      className="w-[42px] h-[42px]"
                    />
                  </div>
                  <div className="flex flex-[5] flex-col gap-[2px] z-10">
                    <h1
                      className="flex text-white text-sm justify-start items-center "
                      style={{ fontFamily: "archivo-bold" }}
                    >
                      {player.username}
                    </h1>
                    <div className="flex justify-start items-center gap-1">
                      <img src="image/leaderboard/coin.png" alt="" />
                      <h1 className="text-white text-[12px] ">
                        {formatNumberWithCommas(player.balance)}
                      </h1>
                    </div>
                  </div>
                  <div
                    className="flex-[2] flex text-[32px] text-white justify-end items-center z-10"
                    style={
                      index < 3
                        ? { fontFamily: "archivo-bold" }
                        : { fontFamily: "archivo" }
                    }
                  >
                    {index + 1}
                    {index == 0 && (
                      <img
                        src="image/leaderboard/firstWinner.png"
                        alt="winner1"
                        className="w-[35px] h-[35px] mx-[4px]"
                      />
                    )}
                    {index == 1 && (
                      <img
                        src="image/leaderboard/secondWinner.png"
                        alt="winner1"
                        className="w-[35px] h-[35px] mx-[4px]"
                      />
                    )}
                    {index == 2 && (
                      <img
                        src="image/leaderboard/thirdWinner.png"
                        alt="winner1"
                        className="w-[35px] h-[35px] mx-[4px]"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[90%] h-[80px] flex justify-between items-center  bg-gradient-to-br from-[#AE47FF] to-[#6929F1] rounded-[12px] px-[17.5px] fixed bottom-[100px]">
              <div className="flex-[1] py-4">
                <img
                  src="image/leaderboard/playerIcon.png"
                  alt=""
                  className="w-[42px] h-[42px]"
                />
              </div>
              <div className="flex-[5] flex-col justify-start items-center">
                <h1
                  className="flex text-white text-sm justify-start items-center "
                  style={{ fontFamily: "archivo-bold" }}
                >
                  {players[0]?.username}
                </h1>
                <div className="flex justify-start items-center gap-1">
                  <img src="image/leaderboard/coin.png" alt="" />
                  <h1 className="text-white text-[12px] ">
                    {formatNumberWithCommas(players[0]?.balance)}
                  </h1>
                </div>
              </div>
              <div className="flex-[2] text-[32px] text-white justify-end items-center">
                10000+
              </div>
            </div>
          </div>
        ) : isLeaderboardOpen == 1 ? (
          <div className="flex flex-col items-center gap-3 w-full min-h-[70vh] max-h-[70vh]">
            <div className="w-full rounded-[17px] border-none bg-[#332166] p-5 flex flex-col gap-4">
              <div className="w-full h-[36px] flex justify-between items-center">
                <h1 className="text-white text-[18px]">Prize Pool</h1>
                <img
                  src="image/leaderboard/iconctt.png"
                  alt="iconctt"
                  className="w-[36px] h-[36px]"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-[10px] leading-[11px] text-[#ABA7BA]">
                  Current Prize Pool
                </h1>
                <h1
                  className="text-[32px] leading-[35px] text-[white]"
                  
                >
                  <strong style={{ fontFamily: "archivo-bold" }}>750,000</strong> $CTT
                </h1>
              </div>
              <div className="flex gap-[20px]">
                <div className="flex flex-col gap-[6px] justify-start items-start">
                  <h1 className="text-[10px] leading-[11px] text-[#ABA7BA]">
                    Current players
                  </h1>
                  <h1
                    className="text-[14px] leading-[15px] text-[white]"
                  >
                    {players.length}
                  </h1>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <h1 className="text-[10px] leading-[11px] text-[#ABA7BA]">
                    Current Milestone
                  </h1>
                  <h1
                    className="text-[14px] leading-[15px] text-[white]"
                  >
                    Milestone 1
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center items-center ">
              <div className="flex justify-around w-full items-center flex-wrap min-h-[30vh] max-h-[45vh] overflow-y-auto gap-[16px]">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center min-w-[46%] max-w-[48%] items-center py-2 px-4 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7F36F7] border border-[#885ECE] rounded-[20px]"
                  >
                    <img
                      src={`/image/leaderboard/${milestone.imgpath}.png`}
                      alt=""
                      className="w-20 h-20"
                    />
                    <h1 className="text-white text-[16px] font-bold">
                      {milestone.title}
                    </h1>
                    <h1 className="text-white text-[14px] mt-[6px]">
                      <strong className="text-[16px]" style={{ fontFamily: "archivo-bold" }}>{formatNumberWithCommas(parseInt(milestone.amount))}</strong> $CTT
                    </h1>
                    <ul className="w-full flex justify-start items-start flex-col ml-7 mt-[10px]" style={{  listStyleType: "disc" }} >
                      <li className="text-[#C8A2FB] text-[12px]">
                        {milestone.players} players
                      </li>
                      <li className="text-[#C8A2FB] text-[12px]">
                        Status: {milestone.status}
                      </li>
                    </ul>
                    <div
                      className="flex justify-center items-center px-3 py-2 text-white text-sm font-bold rounded-[20px] bg-[#7520FF]"
                      onClick={() => handleOpenMilestoneModal(index)}
                    >
                      More Info
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-[70vh] max-h-[70vh] overflow-y-auto w-[97%]">
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <div className="flex justify-between items-center w-full gap-4">
                <h1 className="text-white text-xl font-bold text-left">
                  Welcome to Cashtree Tap-to-Win! <br />
                  <span className="text-[#C8A2FB] font-bold text-xl">
                    Season 1!
                  </span>
                </h1>
                <img
                  src="image/leaderboard/season.png"
                  alt=""
                  className="w-16 h-[70px]"
                />
              </div>
              <div className="flex justify-start items-center text-white text-sm w-[90%] text-left">
                8 August - 22 August 2024 <br />
                Game Status:
              </div>
              <div className="flex w-[95%] px-5 py-2 justify-between items-center rounded-[10px] bg-[#2D2865]">
                <div className="flex justify-center items-center gap-2">
                  <img
                    src="image/leaderboard/seasonUser.png"
                    alt=""
                    className="w-8 h-[26px]"
                  />
                  <div className="flex flex-col justify-center items-center gap-1">
                    <h1 className="text-white text-lg">Total Players</h1>
                    <h1 className="text-[#ABA7BA] text-[12px]">
                      Current all players
                    </h1>
                  </div>
                </div>
                <h1 className="text-[16px] text-white">
                  {formatNumberWithCommas(125350)}
                </h1>
              </div>
              <div className="flex flex-col gap-1 w-full justify-start items-start">
                <h1 className="text-white text-xl">
                  Milestone 1 With Total Reward
                </h1>
                <h1 className="text-white font-bold text-4xl">
                  {formatNumberWithCommas(750000)}$CTT
                </h1>
              </div>
              <div className="flex gap-3 justify-center items-center w-full">
                <div className="flex flex-col flex-1 gap-2 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#3B1E6A] to-[#7520FF] rounded-[10px] p-5">
                  <h1 className="text-white text-[12px] text-left">
                    Reward For<br/> Leaderboard
                  </h1>
                  <h1 className="text-white font-bold text-[18px] text-left">
                    {formatNumberWithCommas(250000)}<br/>$CTT
                  </h1>
                </div>
                <div className="flex flex-col flex-1 gap-2 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#4517A8] to-[#D940FF] rounded-[10px] p-5">
                  <h1 className="text-white text-[12px] text-left">
                    Reward For<br/> Conversion Point
                  </h1>
                  <h1 className="text-white font-bold text-[18px] text-left">
                    {formatNumberWithCommas(500000)}<br/>$CTT
                  </h1>
                </div>
              </div>
              <div className="flex flex-col w-[95%] px-5 py-2 justify-between items-center rounded-[10px] bg-[#2D2865]">
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-white text-xl">Current Status</h1>
                  <img
                    src="image/leaderboard/arrow.png"
                    alt=""
                    className="w-4 h-2"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center items-center w-full">
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex gap-1 justify-center items-center">
                      <img
                        src="image/leaderboard/point.png"
                        alt=""
                        className="w-9 h-9"
                      />
                      <div className="flex flex-col justify-center items-center gap-1">
                        <h1 className="text-white text-lg">
                          Your Points Earned
                        </h1>
                        <h1 className="text-[#ABA7BA] text-[10px]">
                          25 August 2024
                        </h1>
                      </div>
                    </div>
                    <h1 className="text-[16px] text-white">
                      {formatNumberWithCommas(user.balance)}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center gap-2 w-full">
                    <div className="flex justify-center items-center gap-1">
                      <img
                        src="image/leaderboard/rank.png"
                        alt=""
                        className="w-9 h-9"
                      />
                      <div className="flex flex-col justify-center items-center gap-1">
                        <h1 className="text-white text-lg">Your Rank</h1>
                        <h1 className="text-[#ABA7BA] text-[10px]">
                          25 August 2024
                        </h1>
                      </div>
                    </div>
                    <h1 className="text-[16px] text-white">
                      {formatNumberWithCommas(1250)}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[95%] px-5 py-2 justify-start items-start rounded-[10px] bg-[#2D2865] gap-2">
                <h1 className="text-white text-xl">
                  Tips to Boost Your Points
                </h1>
                <ul className="flex flex-col justify-start w-full items-start list-disc">
                  <li className="text-sm text-[#ABA7BA]">Invite Friends:</li>
                  <p className="text-[#ABA7BA] text-sm text-left">
                    This is the only way to earn unlimited points, so spread the
                    word and get your friends involved!
                  </p>
                  <li className="text-sm text-[#ABA7BA]">
                    Complete All Missions:
                  </li>
                  <p className="text-[#ABA7BA] text-sm text-left">
                    Maximize your earnings by completing all available
                    challenges.
                  </p>
                  <li className="text-sm text-[#ABA7BA]">
                    Find the Secret Code:
                  </li>
                  <p className="text-[#ABA7BA] text-sm text-left">
                    Discover the hidden code, however you can, to unlock extra
                    points!
                  </p>
                  <li className="text-sm text-[#ABA7BA]">Stay Active:</li>
                  <p className="text-[#ABA7BA] text-sm text-left">
                    Check in every day for additional rewards and updates.
                  </p>
                </ul>
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <h1 className="text-white text-xl text-left">
                  Keep Tapping and Winning!
                </h1>
                <p className="text-white text-sm text-left">
                  After the game period ends, this page will be updated to show
                  your total $CTT earned from leaderboard standings and
                  conversion points.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-6">
        <Footer />
      </div>
      <Modal isOpen={isMilestoneModal} onClose={handleCloseMilestoneModal}>
        <div className="flex flex-col items-center align-middle justify-center gap-3 w-full">
          <img
            src="image/assets/mission.png"
            alt=""
            className=" w-auto h-[80%]"
          />
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <h1 className="text-[20px] text-white text-left">MileStone 1</h1>
            <h1 className="text-[32px] text-white text-left">
              Leaderboard Prizes Distribution:
            </h1>
          </div>
          <div className="w-full flex justify-center items-center">
            <ul className="flex flex-col justify-start items-start list-disc w-[95%]">
              <li className="text-sm text-[#C8A2FB]">
                Rank 1: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white"> 62,000 $CTT</span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white">225,000 $CTT</span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white">350,000 $CTT</span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white">700,000 $CTT</span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white">1,050,000 $CTT</span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white">1,750,000 $CTT</span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white">2,700,000 $CTT</span>
                ) : (
                  <span className="text-[12px] text-white">3,500,000 $CTT</span>
                )}
              </li>
              <li className="text-sm text-[#C8A2FB]">
                Rank 2: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white"> 46,500 $CTT</span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white">130,000 $CTT</span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white">250,000 $CTT</span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white">500,000 $CTT</span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white">750,000 $CTT</span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white">1,250,000 $CTT</span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white">1,800,000 $CTT</span>
                ) : (
                  <span className="text-[12px] text-white">2,500,000 $CTT</span>
                )}
              </li>
              <li className="text-sm text-[#C8A2FB]">
                Rank 3: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white">39,000 $CTT</span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white">80,000 $CTT</span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white">150,000 $CTT</span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white">300,000 $CTT</span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white">450,000 $CTT</span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white">750,000 $CTT</span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white">1,160,000 $CTT</span>
                ) : (
                  <span className="text-[12px] text-white">1,500,000 $CTT</span>
                )}
              </li>
              <li className="text-sm text-[#C8A2FB]">
                Rank 4 - 10: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white text-wrap">
                    4,500 $CTT each (31,500 $CTT total)
                  </span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white text-wrap">
                    20,000 $CTT each (140,000 $CTT total)
                  </span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white text-wrap">
                    28,000 $CTT each (199,500 $CTT total)
                  </span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white text-wrap">
                    56,000 $CTT each (399,000 $CTT total)
                  </span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white text-wrap">
                    85,500 $CTT each (598,500 $CTT total)
                  </span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white text-wrap">
                    140,000 $CTT each (980,000 $CTT total)
                  </span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white text-wrap">
                    {" "}
                    220,000 $CTT each (1,540,000 $CTT total)
                  </span>
                ) : (
                  <span className="text-[12px] text-white text-wrap">
                    280,000 $CTT each (1,960,000 $CTT total)
                  </span>
                )}
              </li>
              <li className="text-sm text-[#C8A2FB]">
                Rank 11 - 50: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white text-wrap">
                    1,000 $CTT each (40,000 $CTT total)
                  </span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white text-wrap">
                    5,000 $CTT each (200,000 $CTT total)
                  </span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white text-wrap">
                    10,000 $CTT each (400,000 $CTT total)
                  </span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white text-wrap">
                    20,000 $CTT each (800,000 $CTT total)
                  </span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white text-wrap">
                    30,000 $CTT each (1,200,000 $CTT total)
                  </span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white text-wrap">
                    50,000 $CTT each (2,000,000 $CTT total)
                  </span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white text-wrap">
                    75,000 $CTT each (3,000,000 $CTT total)
                  </span>
                ) : (
                  <span className="text-[12px] text-white text-wrap">
                    100,000 $CTT each (4,000,000 $CTT total)
                  </span>
                )}
              </li>
              <li className="text-sm text-[#C8A2FB]">
                Rank 51 - 100: &nbsp;
                {milestone_number == 0 ? (
                  <span className="text-[12px] text-white text-wrap">
                    620 $CTT each (31,000 $CTT total)
                  </span>
                ) : milestone_number == 1 ? (
                  <span className="text-[12px] text-white text-wrap">
                    2,500 $CTT each (125,000 $CTT total)
                  </span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white text-wrap">
                    5,010 $CTT each (250,500 $CTT total)
                  </span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white text-wrap">
                    10,020 $CTT each (501,000 $CTT total)
                  </span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white text-wrap">
                    15,030 $CTT each (751,500 $CTT total)
                  </span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white text-wrap">
                    25,400 $CTT each (1,270,000 $CTT total)
                  </span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white text-wrap">
                    36,000 $CTT each (1,800,000 $CTT total)
                  </span>
                ) : (
                  <span className="text-[12px] text-white text-wrap">
                    50,800 $CTT each (2,540,000 $CTT total)
                  </span>
                )}
              </li>
              {milestone_number != 0 &&(<li className="text-sm text-[#C8A2FB]">
              Rank 101 - 1000: &nbsp;
                {milestone_number == 0 ? (
                  <></>
                ) : milestone_number == 1? (
                  <span className="text-[12px] text-white text-wrap">
                    875 $CTT each (350,000 $CTT total)
                  </span>
                ) : milestone_number == 2 ? (
                  <span className="text-[12px] text-white text-wrap">
                    1,000 $CTT each (900,000 $CTT total)
                  </span>
                ) : milestone_number == 3 ? (
                  <span className="text-[12px] text-white text-wrap">
                    2,000 $CTT each (1,800,000 $CTT total)
                  </span>
                ) : milestone_number == 4 ? (
                  <span className="text-[12px] text-white text-wrap">
                    3,000 $CTT each (2,700,000 $CTT total)
                  </span>
                ) : milestone_number == 5 ? (
                  <span className="text-[12px] text-white text-wrap">
                    5,000 $CTT each (4,500,000 $CTT total)
                  </span>
                ) : milestone_number == 6 ? (
                  <span className="text-[12px] text-white text-wrap">
                    7,500 $CTT each (6,750,000 $CTT total)
                  </span>
                ) : (
                  <span className="text-[12px] text-white text-wrap">
                    10,000 $CTT each (9,000,000 $CTT total)
                  </span>
                )}
              </li>)}
            </ul>
          </div>
          <div
            className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={() => setIsMilestoneModal(false)}
          >
            <span className="flex justify-center items-center text-white text-xl">
              Ok
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
