import { useState } from "react";
import "../css/font.css"
import { Link } from "react-router-dom";

const Onboarding = () => {
    const [pageNum, setPageNum] = useState<number>(1)
    const handleNext = () => {
        setPageNum((prevNum) => prevNum + 1)
    }
    return (
        <div className=" relative w-screen h-screen bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[#120F29] to-[#7F3AEF] py-5" >
            <div className=" absolute w-full h-full right-0 top-0 z-10" style={{ backgroundImage: "url(/image/onboarding/gradient.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            </div>
            <div className="w-full h-full justify-between items-center flex flex-col gap-1 z-20 px-[30px] pb-[30px]">
                <div className="w-full flex-1 justify-center items-start flex z-20">
                    {pageNum == 1 ? <img src="/image/onboarding/onboarding_1.png" alt="" className="w-auto h-[70%] max-h-[350px]" />
                        : pageNum == 2 ? <img src="/image/onboarding/onboarding_2.png" alt="" className="w-auto h-[70%] max-h-[350px]" />
                            : pageNum == 3 ? <img src="/image/onboarding/onboarding_3.png" alt="" className="w-auto h-[70%] max-h-[350px]" />
                                : pageNum == 4 ? <img src="/image/onboarding/onboarding_4.png" alt="" className="w-auto h-[70%] max-h-[350px]" /> :
                                    <img src="/image/onboarding/onboarding_5.png" alt="" className="w-auto h-[70%] max-h-[350px]" />}

                </div>
                <div className="w-full flex justify-center items-center z-20">
                    {pageNum == 1 ?
                        <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                            <h1 className="text-white text-[40px] text-left font-bold">Welcome to Cashtree Tap-To-Win</h1>
                            <p className="text-white text-[18px] leading-[22.5px] text-left">The exciting Web3 tapping game where you can compete to win a massive prize pool of up to 75,000,000 $CTT with a 1000 $CTT entry fee.🏆</p>
                            <p className="text-white text-[14px] leading-[17.5px] text-left">Tap, compete, and take home big $CTT prize! 💰</p>
                        </div>
                        : pageNum == 2 ?
                            <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                                <h1 className="text-white text-[40px] text-left font-bold">Understanding <br />The Game <br />Rules</h1>
                                <p className="text-white text-[14px] leading-[17.5px] text-left"><span className="font-bold text-white text-[14px] leading-[17.5px]">Tap-to-Earn:</span> Accumulate points by tapping the screen and climb the leaderboard. Complete missions, invite friends and redeem codes for extra points. 🎯</p>
                                <p className="text-white text-[14px] leading-[17.5px] text-left"><span className="font-bold text-white text-[14px] leading-[17.5px]">Level Up:</span> Increase your level to earn more points per tap and increase energy bar capacity.</p>
                            </div>
                            : pageNum == 3 ?
                                <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                                    <h1 className="text-white text-[40px] text-left font-bold">The Rewards <br /> and The <br /> Milestones</h1>
                                    <p className="text-white text-[14px] leading-[17.5px] text-left"><span className="font-bold text-white text-[14px] leading-[17.5px]">Bonus Rewards:</span> Reach top rankings to earn bonus rewards. Points convert to $CTT at event's end.</p>
                                    <p className="text-white text-[14px] leading-[17.5px] text-left"><span className="font-bold text-white text-[14px] leading-[17.5px]">More Players, Bigger Prizes:</span> As more players join, the prize pool increases! 🌟 Reach player milestones to unlock larger prize pools for everyone.</p>
                                </div>
                                : pageNum == 4 ?
                                    <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                                        <h1 className="text-white text-[40px] text-left font-bold">Purchase <br /> Your One-Time <br /> Entry Fee</h1>
                                        <p className="text-white text-[18px] leading-[22.5px] text-left">Buy $CTT on Bybit Exchange and transfer it to your crypto wallet. Once transferred, connect your crypto wallet to the game, and pay one-time entry fee 1000 $CTT to enter!</p>
                                    </div>
                                    : <div className="w-full h-full flex flex-col justify-start items-start gap-2">
                                        <h1 className="text-white text-[40px] text-left font-bold">Trying <br /> the Demo Mode <br /> First</h1>
                                        <p className="text-white text-[18px] leading-[22.5px] text-left">Play the demo for free. Pay the entry fee to unlock all features. Your demo points will carry over when you start the full game!</p>
                                    </div>
                    }
                </div>
                <div className="w-full justify-center items-center gap-1 flex my-5 z-20">
                    <div className={`border border-white h-2 ${pageNum == 1 ? "w-5" : "w-2"} rounded bg-white`}></div>
                    <div className={`border border-white h-2 ${pageNum == 2 ? "w-5" : "w-2"} rounded bg-white`}></div>
                    <div className={`border border-white h-2 ${pageNum == 3 ? "w-5" : "w-2"} rounded bg-white`}></div>
                    <div className={`border border-white h-2 ${pageNum == 4 ? "w-5" : "w-2"} rounded bg-white`}></div>
                    <div className={`border border-white h-2 ${pageNum == 5 ? "w-5" : "w-2"} rounded bg-white`}></div>
                </div>
                {
                    pageNum == 5 ?
                        <Link to={"/home"} className="w-full flex justify-center items-center text-white rounded-[20px] bg-[#7520FF] h-[56px] py-4 z-20">
                            <span className="text-white text-xl">Start game</span>
                        </Link>
                        :
                        <div className="w-full flex justify-center items-center text-white rounded-[20px] bg-[#7520FF] h-[56px] py-4 z-20" onClick={handleNext}>
                            <span className="text-white text-xl"> Next </span>
                        </div>
                }

            </div>
        </div>
    )
}
export default Onboarding;