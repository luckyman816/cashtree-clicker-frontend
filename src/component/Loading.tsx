import "./Loading.css";
import "../css/font.css";
const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center" style={{ backgroundImage: "url(/image/loading/cashtree_loading.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
