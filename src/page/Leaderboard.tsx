import Footer from "../component/Footer";
import { /*toast,*/ ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
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
    const players_state = useSelector((state) => state.wallet.users);
    const [players, setPlayers] = useState(players_state);
    useEffect(() => {
        dispatch(getAllUsers());
    }, [])
    useEffect(() => {
        setPlayers(players_state);
    }, [players_state, setPlayers])
    console.log("players----------->", players);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
    const handleLeaderboardClick = () => {
        setIsLeaderboardOpen(true);
    }
    const handlePrizePoolClick = () => {
        setIsLeaderboardOpen(false);
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
            <div className="p-5 flex flex-col justify-center items-center gap-5 w-full">
                <ToastContainer />
                <div className="flex w-full h-14 rounded-[12px] bg-[#120F29] justify-center items-center px-5 gap-5">
                    <div className={`w-2/3  text-lg text-white ${isLeaderboardOpen ? "bg-[#7520FF]" : "bg-[#120F29]"} py-2 rounded-[10px]`} onClick={() => handleLeaderboardClick()}>Leaderboard</div>
                    <div className={`w-2/3  text-lg text-white ${!isLeaderboardOpen ? "bg-[#7520FF]" : "bg-[#120F29]"} py-2 rounded-[10px]`} onClick={() => handlePrizePoolClick()}>Prize Pool</div>
                </div>
                {isLeaderboardOpen ? (
                    <div className="flex flex-col justify-center items-center gap-3 w-full">
                        <div className="text-white text-[32px] justify-center font-[Archivo] items-center">Leaderboard</div>
                        <div className="text-white text-[12px] justify-center items-center">Leaderboard & rank of worldwide players</div>
                        <div className="min-h-[40vh] max-h-[40vh] flex flex-col overflow-auto w-full gap-3">
                            {players.map((player, index) => (
                                <div key={index} className="flex justify-between items-center w-full bg-gradient-to-br from-[#8137F9] to-[#240C4D] rounded-[12px] px-4">
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
                                <div className="flex text-white text-[12px] justify-start items-center">Budi</div>
                                <div className="flex justify-start items-center">
                                    <img src="image/leaderboard/coin.png" alt="" />
                                    <div className="text-white text-[12px]">599,989,999</div>
                                </div>
                            </div>
                            <div className="flex-[2] text-2xl text-white justify-end items-center">10000+</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-3 w-full">
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
                )
                }
            </div>
            <Footer />
        </div>
    )
}