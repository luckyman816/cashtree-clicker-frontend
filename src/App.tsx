import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./page/Home";
import Friends from "./page/Friends";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Loading from "./component/Loading";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost";
import Mission from "./page/Mission";
import Leaderboard from "./page/Leaderboard";
import Wallet from "./page/Wallet";
// import MobileQR from "./component/MobileQR";
function App() {
  const [loading, setLoading] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);
  // useEffect(() => {
  //   const isMobile =
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //       navigator.userAgent
  //     );
  //   setIsMobile(isMobile);
  // }, []);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);
  return (
    <Router>
      {/*!isMobile ? (
        <MobileQR />
      ) : */loading ? (
        <Loading />
      ) : (
        <div className="App h-screen w-screen">
          <ReduxProvider store={store}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="mission" element={<Mission />} />
                <Route path="friends" element={<Friends />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="boost" element={<Boost />} />
              </Route>
            </Routes>
            <ToastContainer />
          </ReduxProvider>
        </div>
      )}
    </Router>
  );
}

export default App;
