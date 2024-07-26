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
                <div className="w-2/3 bg-[#120F29]  text-lg text-white active:bg-[#7520FF] py-2 rounded-[10px]" onClick={() => handleLeaderboardClick()}>Leaderboard</div>
                <div className="w-2/3 bg-[#120F29]  text-lg text-white active:bg-[#7520FF] py-2 rounded-[10px]" onClick={() => handlePrizePoolClick()}>Prize Pool</div>
            </div>
            <div className="text-white text-[32px] justify-center font-[Archivo] items-center">Leaderboard</div>
            <div className="text-white text-[12px] justify-center items-center">Leaderboard & rank of worldwide players</div>
            {isLeaderboardOpen ? (
                <div className="min-h-[45vh] max-h-[45vh] flex flex-col overflow-auto w-full gap-3">
                    {Players.map((player, index) => (
                        <div key={index} className="flex justify-between items-center w-full bg-gradient-to-br from-[#8137F9] to-[#240C4D] rounded-[12px] px-4">
                            <div className="flex-[1] py-4">
                                <img src="image/leaderboard/playerIcon.png" alt="" className="w-[42px] h-[42px]" />
                            </div>
                            <div className="flex-[5] flex-col justify-start items-center">
                                <div className="flex text-white text-[12px] justify-start items-center">{player.name}</div>
                                <div className="flex justify-start items-center">
                                    <img src="image/leaderboard/coin.png" alt="" />
                                    <div className="text-white text-[12px]">{player.coin}</div>
                                </div>
                            </div>
                            <div className="flex-[2] text-2xl text-white justify-end items-center">{index + 1}</div>
                        </div>
                    ))}
                </div>
            ) :

                (<div className="min-h-[45vh] flex overflow-auto w-full">
                </div>)
            }
        </div>)
}