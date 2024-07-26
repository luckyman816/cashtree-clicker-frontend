import Footer from "../component/Footer";
import Leaderboarder from "../component/Leaderboarder";
export default function Leaderboard() {
    return (
        <div className="flex flex-col justify-between items-center h-full w-full ">
            <Leaderboarder />
            <Footer />
        </div>
    )
}