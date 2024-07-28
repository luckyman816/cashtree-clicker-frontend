import { ToastContainer } from "react-toastify"
export default function Wallet() {
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
        <div className="flex flex-col w-full justify-center items-center gap-2">
            <img src="image/wallet/cointap.png" alt="" className="w-60 h-60"/>
            <div className="text-3xl text-white font-[Archivo] font-bold">Wallet</div>
            <div className="text-sm text-white font-[Archivo]">Your wallet connect address</div>
        </div>
        <div className="flex flex-col w-full justify-start items-center gap-4">
            <div>Task List</div>
            <div className=""></div>
        </div>
        </div>
    )
}