import Footer from "../component/Footer";

export default function Leaderboard() {
    return (
        <div className="flex flex-col justify-between items-center h-full w-full ">
            <div className="w-[90%] flex flex-col justify-center items-center mt-11 gap-4">
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

                <Footer />
            </div>
        </div>
    )
}