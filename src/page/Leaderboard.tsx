import Footer from "../component/Footer";
import { /*toast,*/ ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
import "../css/font.css";
const milestones = [
    {
        imgpath: "milestone1",
        title: "Milestone 1",
        amount: "750000",
        players: "1000",
        status: "Done",

    },
    {
        imgpath: "milestone2",
        title: "Milestone 2",
        amount: "3750000",
        players: "5000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 3",
        amount: "7500000",
        players: "10000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 4",
        amount: "15000000",
        players: "20000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 5",
        amount: "22500000",
        players: "30000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 6",
        amount: "37500000",
        players: "50000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 7",
        amount: "56250000",
        players: "75000",
        status: "Unlocked",
    },
    {
        imgpath: "milestone3",
        title: "Milestone 8",
        amount: "75000000",
        players: "100000+",
        status: "Unlocked",
    },
]
export default function Leaderboard() {
    function formatNumberWithCommas(number: number, locale = "en-US") {
        return new Intl.NumberFormat(locale).format(number);
    }
    const players_state = useSelector((state) => state.wallet.users);
    const [players, setPlayers] = useState(players_state);
    useEffect(() => {
        dispatch(getAllUsers()).then(() => {
            setPlayers(players_state);
        });
    }, [players_state])

    console.log("players----------->", players);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(0);
    const handleLeaderboardClick = () => {
        setIsLeaderboardOpen(0);
    }
    const handlePrizePoolClick = () => {
        setIsLeaderboardOpen(1);
    }
    const handleResultClick = () => {
        setIsLeaderboardOpen(2);
    }
    return (
        <div className="flex flex-col justify-between items-center h-full w-full bg-[#120F29]">
            <div className="flex justify-between items-center px-3 w-full py-3">
                <img src="image/icon/back.png" alt="" className=" w-4 h-4" />
                <h3
                    className="text-sm text-[white]"
                    style={{ fontFamily: "archivo" }}
                >
                    Cashtree Tap to Win
                </h3>
                <img src="image/icon/menu.png" alt="" className=" w-5 h-5" />
            </div>
            <div className="flex w-full h-8 rounded-[12px] bg-[#120F29] justify-around items-center px-5 border-b border-[#3C375C]">
                <div className={`w-1/3 h-full text-sm  ${isLeaderboardOpen == 0 ? "text-[#7520FF] border-b-2 font-bold border-[#7520FF]" : "text-[#ABA7BA] border-b border-[#3C375C]"}`} onClick={() => handleLeaderboardClick()}>LEADERBOARD</div>
                <div className={`w-1/3 h-full text-sm  ${isLeaderboardOpen == 1 ? "text-[#7520FF] border-b-2 font-bold border-[#7520FF]" : "text-[#ABA7BA] border-b border-[#3C375C]"}`} onClick={() => handlePrizePoolClick()}>PRIZE POOL</div>
                <div className={`w-1/3 h-full text-sm  ${isLeaderboardOpen == 2 ? "text-[#7520FF] border-b-2 font-bold border-[#7520FF]" : "text-[#ABA7BA] border-b border-[#3C375C]"}`} onClick={() => handleResultClick()}>RESULT</div>
            </div>
            <div className="px-2 flex flex-col justify-start items-center gap-5 w-full">
                {isLeaderboardOpen == 0 ? (
                    <div className="flex flex-col justify-start items-center gap-3 w-full min-h-[70vh] max-h-[70vh]">
                        <div className="text-white text-[32px] justify-center font-[Archivo] items-center">Leaderboard</div>
                        <div className="text-white text-[12px] justify-center items-center">Leaderboard & rank of worldwide players</div>
                        <div className="min-h-[40vh] max-h-[40vh] flex flex-col overflow-auto w-full gap-3">
                            {players?.map((player, index) => (
                                <div key={index} className="flex justify-between items-center w-full bg-[#2D2865] rounded-[12px] px-4">
                                    <div className="flex-[1.5] py-2">
                                        <img src="image/leaderboard/playerIcon.png" alt="" className="w-[42px] h-[42px]" />
                                    </div>
                                    <div className="flex-[5] flex-col  gap-2">
                                        <div className="flex text-white text-[12px] justify-start items-center font-[Archivo]">{player.username}</div>
                                        <div className="flex justify-start items-center">
                                            <img src="image/leaderboard/coin.png" alt="" />
                                            <div className="text-white text-[12px] font-[Archivo]">{player.balance}</div>
                                        </div>
                                    </div>
                                    <div className="flex-[2] flex text-2xl text-white justify-end items-center">{index + 1}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center w-full bg-gradient-to-br from-[#AE47FF] to-[#6929F1] rounded-[12px] px-4">
                            <div className="flex-[1] py-4">
                                <img src="image/leaderboard/playerIcon.png" alt="" className="w-[42px] h-[42px]" />
                            </div>
                            <div className="flex-[5] flex-col justify-start items-center">
                                <div className="flex text-white text-[12px] justify-start items-center">{players[0]?.username}</div>
                                <div className="flex justify-start items-center">
                                    <img src="image/leaderboard/coin.png" alt="" />
                                    <div className="text-white text-[12px]">{players[0]?.balance}</div>
                                </div>
                            </div>
                            <div className="flex-[2] text-2xl text-white justify-end items-center">10000+</div>
                        </div>
                    </div>
                ) : isLeaderboardOpen == 1 ? (
                    <div className="flex flex-col justify-center items-center gap-3 w-full min-h-[70vh] max-h-[70vh]">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex justify-center items-center gap-1">
                                <img src="image/leaderboard/star.png" alt="" className="w-4 h-4" />
                                <h1 className="text-white text-sm">Total Current Prize</h1>
                            </div>
                            <div className="flex justify-center items-center gap-1">
                                <h1 className="text-white text-lg">750,000</h1>
                                <h1 className="text-white text-sm">$CTT</h1>
                            </div>
                        </div>
                        <div className="w-full px-2 py-2 flex justify-between items-center rounded-[12px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD]">
                            <div className="flex justify-center items-center">
                                <img src="image/leaderboard/currentPlayer.png" alt="" className="w-11 h-11" />
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-[#FFC107] text-[11px]">Current Players</h1>
                                    <h1 className="text-white text-sm font-bold">+120.000</h1>
                                </div>
                            </div>
                            <div className="w-[1px] h-[30px] bg-white"></div>
                            <div className="flex justify-center items-center">
                                <img src="image/leaderboard/currentMilestone.png" alt="" className="w-11 h-11" />
                                <div className="flex flex-col justify-center items-center">
                                    <h1 className="text-[#FFC107] text-[11px]">Current Milestone</h1>
                                    <h1 className="text-white text-sm font-bold">Milestone 1</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex  w-full justify-center items-center ">
                            <div className="flex justify-around w-full items-center flex-wrap min-h-[30vh] max-h-[50vh] overflow-y-auto gap-2">
                                {
                                    milestones.map((milestone, index) => (
                                        <div key={index} className="flex flex-col justify-center min-w-[40%] max-w-[40%] items-center py-2 px-4 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7F36F7] border border-[#885ECE] rounded-[20px]">
                                            <img src={`/image/leaderboard/${milestone.imgpath}.png`} alt="" className="w-20 h-20" />
                                            <h1 className="text-white text-[16px] font-bold">{milestone.title}</h1>
                                            <h1 className="text-white text-[16px] font-bold">{milestone.amount}<span className="text-sm">$CTT</span></h1>
                                            <div className="w-full flex justify-start items-center flex-col">
                                                <p className="text-[#C8A2FB] text-[12px]">{milestone.players}</p>
                                                <p className="text-[#C8A2FB] text-[12px]">{milestone.status}</p>
                                            </div>
                                            <div className="flex justify-center items-center px-3 py-2 text-white text-sm font-bold rounded-[20px] bg-[#7520FF]">More Info</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[70vh] max-h-[70vh] overflow-y-auto w-[95%]">
                        <div className="flex flex-col justify-center items-center gap-3 w-full">
                            <div className="flex justify-between items-center w-full gap-4">
                                <h1 className="text-white text-xl font-bold text-left">Welcome to Cashtree Tap-to-Win! <br /><span className="text-[#C8A2FB] font-bold text-xl">Season 1!</span></h1>
                                <img src="image/leaderboard/season.png" alt="" className="w-16 h-[70px]" />
                            </div>
                            <div className="flex justify-start items-center text-white text-sm w-[90%]">8 August - 22 August 2024 <br />Game Status:</div>
                            <div className="flex w-[95%] px-5 py-2 justify-between items-center rounded-[10px] bg-[#2D2865]">
                                <div className="flex justify-center items-center gap-2">
                                    <img src="image/leaderboard/seasonUser.png" alt="" className="w-8 h-[26px]" />
                                    <div className="flex flex-col justify-center items-center gap-1">
                                        <h1 className="text-white text-lg">Total Players</h1>
                                        <h1 className="text-[#ABA7BA] text-[10px]">Current all players</h1>
                                    </div>
                                </div>
                                <h1 className="text-[16px] text-white">{formatNumberWithCommas(125350)}</h1>
                            </div>
                            <div className="flex flex-col gap-1 w-full justify-start items-start">
                                <h1 className="text-white text-xl">Milestone 8 With Total Reward</h1>
                                <h1 className="text-white font-bold text-4xl">{formatNumberWithCommas(75000000)}$CTT</h1>
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                                <div className="flex flex-col gap-2 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#3B1E6A] to-[#7520FF] rounded-[10px] p-5">
                                    <h1 className="text-white text-[12px]">Reward For Leaderboard</h1>
                                    <h1 className="text-white font-bold text-[18px]">{formatNumberWithCommas(25000000)}$CTT</h1>
                                </div>
                                <div className="flex flex-col gap-2 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#4517A8] to-[#D940FF] rounded-[10px] p-5">
                                    <h1 className="text-white text-[12px]">Reward For Leaderboard</h1>
                                    <h1 className="text-white font-bold text-[18px]">{formatNumberWithCommas(25000000)}$CTT</h1>
                                </div>
                            </div>
                            <div className="flex flex-col w-[95%] px-5 py-2 justify-between items-center rounded-[10px] bg-[#2D2865]">
                                <div className="flex justify-between items-center w-full">
                                    <h1 className="text-white text-xl">Current Status</h1>
                                    <img src="image/leaderboard/arrow.png" alt="" className="w-4 h-2" />
                                </div>
                                <div className="flex flex-col gap-2 justify-center items-center w-full">
                                    <div className="flex justify-between items-center gap-2 w-full">
                                        <div className="flex gap-1 justify-center items-center">
                                            <img src="image/leaderboard/point.png" alt="" className="w-9 h-9" />
                                            <div className="flex flex-col justify-center items-center gap-1">
                                                <h1 className="text-white text-lg">Your Points Earned</h1>
                                                <h1 className="text-[#ABA7BA] text-[10px]">25 August 2024</h1>
                                            </div>
                                        </div>
                                        <h1 className="text-[16px] text-white">{formatNumberWithCommas(3450899)}</h1>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 w-full">
                                        <div className="flex justify-center items-center gap-1">
                                            <img src="image/leaderboard/rank.png" alt="" className="w-9 h-9" />
                                            <div className="flex flex-col justify-center items-center gap-1">
                                                <h1 className="text-white text-lg">Your Rank</h1>
                                                <h1 className="text-[#ABA7BA] text-[10px]">25 August 2024</h1>
                                            </div>
                                        </div>
                                        <h1 className="text-[16px] text-white">{formatNumberWithCommas(1250)}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-[95%] px-5 py-2 justify-start items-start rounded-[10px] bg-[#2D2865] gap-2">
                                <h1 className="text-white text-xl">Tips to Boost Your Points</h1>
                                <ul className="flex flex-col justify-start w-full items-start list-disc">
                                    <li className="text-sm text-[#ABA7BA]">Invite Friends:</li>
                                    <p className="text-[#ABA7BA] text-sm">This is the only way to earn unlimited points, so spread the word and get your friends involved!</p>
                                    <li className="text-sm text-[#ABA7BA]">Complete All Missions:</li>
                                    <p className="text-[#ABA7BA] text-sm">Maximize your earnings by completing all available challenges.</p>
                                    <li className="text-sm text-[#ABA7BA]">Find the Secret Code:</li>
                                    <p className="text-[#ABA7BA] text-sm">Discover the hidden code, however you can, to unlock extra points!</p>
                                    <li className="text-sm text-[#ABA7BA]">Stay Active:</li>
                                    <p className="text-[#ABA7BA] text-sm">Check in every day for additional rewards and updates.</p>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-start items-center w-full">
                                <h1 className="text-white text-xl">Keep Tapping and Winning!</h1>
                                <p className="text-white text-sm">After the game period ends, this page will be updated to show your total $CTT earned from leaderboard standings and conversion points.</p>
                            </div>
                        </div>
                    </div>
                )
                }
                <ToastContainer />
            </div>
            <Footer />
        </div>
    )
}