import { /*toast,*/ ToastContainer } from "react-toastify";
export default function Leaderboarder() {
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
            <div className="w-2/3 bg-[#120F29]  text-lg text-white active:bg-[#7520FF] py-3 rounded-[10px]">Leaderboard</div>
            <div className="w-2/3 bg-[#120F29]  text-lg text-white active:bg-[#7520FF] py-3 rounded-[10px]">Prize Pool</div>
        </div>
        <div className="text-white text-[32px] justify-center font-[Archivo] items-center">Leaderboard</div>
        <div className="text-white text-[12px] justify-center items-center">Leaderboard & rank of worldwide players</div>
      </div>)
}