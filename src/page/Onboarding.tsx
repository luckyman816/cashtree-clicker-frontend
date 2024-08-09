import "../css/font.css"
const Onboarding = () => {

    return (
        <div className=" relative w-screen h-screen flex flex-col justify-around items-center bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[#120F29] to-[#7F3AEF]" >
            <div className=" absolute w-full h-full right-0 top-0 z-10" style={{ backgroundImage: "url(/image/onboarding/gradient.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
            </div>
            <div className="w-full justify-center items-center flex z-20">
                <img src="/image/onboarding/onboarding_1.png" alt="" className="w-[80%] h-auto" />
            </div>
            <div className="w-full justify-center items-center flex flex-col gap-2 z-20">
                <div className="w-[90%] justify-start items-start gap-2">
                    <h1 className="text-white text-[40px] text-left">Welcome to Cashtree Tap-To-Win</h1>
                    <p className="text-white text-lg text-left">The exciting Web3 tapping game where you can compete to win a massive prize pool of up to 75,000,000 $CTT with a 1000 $CTT entry fee.🏆</p>
                    <p className="text-white text-sm text-left">Tap, compete, and take home big $CTT prize! 💰</p>
                </div>
                <div className="w-full justify-center items-center gap-1 flex">
                    <div className=" border border-white h-1 w-4 rounded-[2px] bg-white"></div>
                    <div className=" border border-white h-1 w-1 rounded-[2px] bg-white"></div>
                    <div className=" border border-white h-1 w-1 rounded-[2px] bg-white"></div>
                    <div className=" border border-white h-1 w-1 rounded-[2px] bg-white"></div>
                    <div className=" border border-white h-1 w-1 rounded-[2px] bg-white"></div>
                </div>
                <div className="w-[90%] flex justify-center items-center text-white rounded-[10px] bg-[#7520FF] h-[fit-content] py-4">
                    <span className="text-white text-xl">Next</span>
                </div>
            </div>
        </div>
    )
}
export default Onboarding;