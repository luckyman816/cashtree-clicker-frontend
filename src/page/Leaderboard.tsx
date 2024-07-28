import Footer from "../component/Footer";
import LeaderboardList from "../component/LeaderboardList";
export default function Leaderboard() {
    return (
        <div className="flex flex-col justify-between items-center h-full w-full ">
            <LeaderboardList />
            <Footer />
        </div>
    )
}