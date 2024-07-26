import { /*toast,*/ ToastContainer } from "react-toastify";
export default function Leaderboarder() {
    return (
        <div className="p-5 flex flex-col justify-center items-center gap-4 w-full">
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
        <div className="flex w-full h-14 rounded-[12px] bg-[#120F29] justify-center items-center gap-5"></div>
        <div className="flex w-full justify-center items-center">
          <p className="text-sm text-white">You and your friend will receive bonuses</p>
        </div>
        <div className="flex w-[95%] justify-between px-3 py-3 items-center rounded-[20px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#AA45FE]">
          <div className="flex justify-center items-center gap-3">
            <img src="image/friends/friends.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-white text-xl font-bold">Invite Friends</h1>
              <h1 className="text-white text-sm ">For you and your friend</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <img src="image/assets/coin.png" alt="coin" className="w-5 h-5" />
            <h1 className="text-[#FFC107] text-sm">+25.000</h1>
          </div>
        </div>
      </div>)
}