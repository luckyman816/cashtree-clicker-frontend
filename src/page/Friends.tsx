import Footer from "../component/Footer";
import QuestList from "../component/QuestList";

export default function Friends() {
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <QuestList />
      <Footer/>
    </div>
  );
}
