import RankingList from "../component/RankingList";

export default function Ranking() {
  return (
    <div className="Ranking max-w-full mx-auto text-white max-sm:h-[75vh] mt-12">
      <h1 className="text-3xl mb-3  max-w-[500px] mx-auto text-start text-white flex justify-center">Ranking</h1>
      <RankingList />
    </div>
  )
}
