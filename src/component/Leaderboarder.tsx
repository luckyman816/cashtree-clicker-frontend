import { /*toast,*/ ToastContainer } from "react-toastify";
import { useState } from "react";
export default function Leaderboarder() {
    const Players = [
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
        { name: "User1", coin: "25.000" },
    ]
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
    const handleLeaderboardClick = () => {
        setIsLeaderboardOpen(true);
    }
    const handlePrizePoolClick = () => {
        setIsLeaderboardOpen(false);
    }
    return (
        <div className="p-5 flex flex-col justify-center items-center gap-5 w-full">
            <ToastContainer />
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
            <div className="flex w-full h-14 rounded-[12px] bg-[#120F29] justify-center items-center px-5 gap-5">
                <div className={`w-2/3  text-lg text-white ${isLeaderboardOpen ? "bg-[#7520FF]" : "bg-[#120F29]"} py-2 rounded-[10px]`} onClick={() => handleLeaderboardClick()}>Leaderboard</div>
                <div className={`w-2/3  text-lg text-white ${!isLeaderboardOpen ? "bg-[#7520FF]" : "bg-[#120F29]"} py-2 rounded-[10px]`} onClick={() => handlePrizePoolClick()}>Prize Pool</div>
            </div>
            {isLeaderboardOpen ? (
                <div className="flex flex-col justify-center items-center gap-3 w-full">
                    <div className="text-white text-[32px] justify-center font-[Archivo] items-center">Leaderboard</div>
                    <div className="text-white text-[12px] justify-center items-center">Leaderboard & rank of worldwide players</div>
                    <div className="min-h-[40vh] max-h-[40vh] flex flex-col overflow-auto w-full gap-3">
                        {Players.map((player, index) => (
                            <div key={index} className="flex justify-between items-center w-full bg-gradient-to-br from-[#8137F9] to-[#240C4D] rounded-[12px] px-4">
                                <div className="flex-[1.5] py-2">
                                    <img src="image/leaderboard/playerIcon.png" alt="" className="w-[42px] h-[42px]" />
                                </div>
                                <div className="flex-[5] flex-col  gap-2">
                                    <div className="flex text-white text-[12px] justify-start items-center font-[Archivo]">{player.name}</div>
                                    <div className="flex justify-start items-center">
                                        <img src="image/leaderboard/coin.png" alt="" />
                                        <div className="text-white text-[12px] font-[Archivo]">{player.coin}</div>
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
                            <img src="image/leaderboard/star.png" alt="" className="w-4 h-4"/>
                            <h1 className="text-white text-sm">Total Current Prize</h1>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <h1 className="text-white text-lg">750,000</h1>
                            <h1 className="text-white text-sm">$CTT</h1>
                        </div>
                    </div>
                    <div className="w-full px-2 py-2 flex justify-between items-center rounded-[12px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD]">
                        <div className="flex justify-center items-center">
                            <img src="image/leaderboard/currentPlayer.png" alt="" className="w-11 h-11"/>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-[#FFC107] text-[11px]">Current Players</h1>
                                <h1 className="text-white text-sm font-bold">+120.000</h1>
                            </div>
                        </div>
                        <div className="w-[1px] h-[30px] bg-white"></div>
                        <div className="flex justify-center items-center">
                            <img src="image/leaderboard/currentMilestone.png" alt="" className="w-11 h-11"/>
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-[#FFC107] text-[11px]">Current Milestone</h1>
                                <h1 className="text-white text-sm font-bold">Milestone 1</h1>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[40vh] flex overflow-auto w-full">
                        <div className="flex flex-col justify-center items-center py-2 px-2 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD]">
                            <img src="image/leaderboard/milestone1.png" alt="" className="w-20 h-20"/>
                            <h1 className="text-white text-lg font-bold">Milestone 1</h1>
                            <h1 className="text-white text-lg font-bold">750,000 <span className="text-sm">$CTT</span></h1>
                            <ul>
                                <li className="text-[#C8A2FB] text-[12px]">1000 players</li>
                                <li className="text-[#C8A2FB] text-[12px]">Status: Done</li>
                            </ul>
                            <div className="flex justify-center items-center px-2 py-2 text-white text-sm font-bold rounded-[20px]">More Info</div>
                        </div>
                    </div>
                </div>
            )
            }

        </div>)
}