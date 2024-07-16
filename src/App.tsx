import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Home from "./page/Home";
import Ranking from "./page/Ranking";
import Quest from "./page/Quest";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Loading from "./component/Loading";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import Boost from "./page/Boost";
import Task from "./page/Task";
import Airdrop from "./page/Airdrop";
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
        <div className="App h-screen">
          <ReduxProvider store={store}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="ranking" element={<Ranking />} />
                <Route path="quest" element={<Quest />} />
                <Route path="boost" element={<Boost />} />
                <Route path="task" element={<Task />} />
                <Route path="airdrop" element={<Airdrop />} />
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
