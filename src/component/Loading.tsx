import "./Loading.css";
import "../css/font.css";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-around items-center" style={{ backgroundImage: "url(/image/loading/cover-new.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="flex-1"></div>
      <div className="flex flex-col justify-center items-center">
        <div className="loader"></div>
        <h1 className="text-white text-sm">Please wait...</h1>
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="text-[76px] text-white" style={{ fontFamily: "jockey" }}>
          Cashtree Tap To Win
        </div>
        <div className="text-[26px] text-white" style={{ fontFamily: "avenir" }}>
        Tap, compete & win <br /> the big $CTT prize!
        </div>
      </div>

    </div>
  );
};

export default Loading;
