import { dispatch, useSelector } from "../store";
import toast, { Toaster } from 'react-hot-toast';
import {
  updateWallet,
  getWallet,
  updateBalance,
} from "../store/reducers/wallet";
import { getDailyBoost, updateDoublePoints, updateRefillEnergy } from "../store/reducers/dailyBoost";
import { useEffect, useState } from "react";
import Modal from "../component/modal";
import Footer from "../component/Footer";
import moment from "moment";
export default function Boost() {
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const limit_state = useSelector((state) => state.wallet.user?.limit);
  const tapLevelState = useSelector((state) => state.wallet.user?.tap_level);
  const refill_energy_state = useSelector(
    (state) => state.dailyBoost.daily_refill_energy?.refill_energy
  )
  const double_points_state = useSelector(
    (state) => state.dailyBoost.daily_double_points?.double_points
  )
  const refill_energy_date_state = useSelector(
    (state) => state.dailyBoost.daily_refill_energy?.refill_energy_date
  )
  const double_points_date_state = useSelector(
    (state) => state.dailyBoost.daily_double_points?.double_points_date
  )
  const [token, setToken] = useState<number>(tokenState);
  const [username, setUsername] = useState<string>(username_state);
  const [limit, setLimit] = useState<number>(limit_state);
  const [refill_energy, setRefillEnergy] = useState<number>(refill_energy_state);
  const [refill_energy_date, setRefillEnergyDate] = useState<moment.Moment | null>(refill_energy_date_state ? moment(refill_energy_date_state) : null);
  const [double_points, setDoublePoints] = useState<number>(double_points_state);
  const [double_points_date, setDoublePointsDate] = useState<moment.Moment | null>(double_points_date_state ? moment(double_points_date_state) : null);
  useEffect(() => {
    dispatch(getWallet(username));
    dispatch(getDailyBoost(username))
  }, [username]);
  useEffect(() => {
    setToken(tokenState);
    setUsername(username_state);
    setLimit(limit_state);
    setRefillEnergy(refill_energy_state);
    setDoublePoints(double_points_state);
    setRefillEnergyDate(refill_energy_date_state ? moment(refill_energy_date_state) : null);
    setDoublePointsDate(double_points_date_state ? moment(double_points_date_state) : null);
  }, [tokenState, username_state, limit_state, tapLevelState, refill_energy_state, double_points_state, refill_energy_date_state, double_points_date_state]);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const [diffDaysRefill, setDiffDaysRefill] = useState<number>(0);
  const [diffDaysDouble, setDiffDaysDouble] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      calculateDifference(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const calculateDifference = (currentDateTime: moment.Moment) => {
    if (refill_energy_date) {
      const dateDiffRefill = refill_energy_date
        ? currentDateTime.diff(refill_energy_date, "seconds")
        : 0;
      const dateDiffDouble = double_points_date
        ? currentDateTime.diff(double_points_date, "seconds")
        : 0;
      setDiffDaysRefill(Math.floor(dateDiffRefill / (60 * 60 * 24)));
      setDiffDaysDouble(Math.floor(dateDiffDouble / (60 * 60 * 24)));
    }
  };
  console.log("-----day----->", diffDaysDouble, diffDaysRefill);
  const handleRefillEnergy = () => {
    console.log("-----full energy💰🏆💪------>", limit_state);
    if (diffDaysRefill == 0) {
      if (refill_energy + 1 > 3) {
        toast.error("Maximum value reached!");
      } else {
        dispatch(updateRefillEnergy(username, refill_energy + 1, moment()));
        dispatch(updateWallet(username, (token - 3000), limit));
        toast.success("Refilled successfully");
      }
    }
    setIsRefillEnergyModalOpen(false);
  };
  const handleDoublePoints = () => {
    if (diffDaysDouble == 0) {
      if (double_points + 1 > 3) {
        toast.error("Maximum value reached!");
      } else {
        dispatch(updateDoublePoints(username, double_points + 1, moment()));
        dispatch(updateBalance(username, token + 500))
        toast.success("Refilled successfully");
      }
    }
    setIsDoublePointsModalOpen(false);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (diffDaysRefill > 0) {
        dispatch(updateRefillEnergy(username, 0, moment()));
      }
      if (diffDaysDouble > 0) {
        dispatch(updateDoublePoints(username, 0, moment()));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  const [isRefillEnergyModalOpen, setIsRefillEnergyModalOpen] = useState<boolean>(false);
  const handleMouseClick = () => {
    setIsRefillEnergyModalOpen(true);
  };
  const handleCloseRefillEnergyModal = () => {
    setIsRefillEnergyModalOpen(false);
  };
  const [isDoublePointsModalOpen, setIsDoublePointsModalOpen] = useState<boolean>(false);
  const handleOpenDoublePointsModal = () => {
    setIsDoublePointsModalOpen(true);
  };
  const handleCloseDoublePointsModal = () => {
    setIsDoublePointsModalOpen(false);
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <Toaster />
      <div className="flex justify-between items-center px-3 py-5 w-full">
        <img src="image/icon/back.png" alt="" className=" w-4 h-4" />
        <h3
          className="text-sm text-[white]"
          style={{ fontFamily: "archivo" }}
        >
          Boosters
        </h3>
        <img src="image/icon/menu.png" alt="" className=" w-5 h-5" />
      </div>
      <div className="w-full mt-3 flex flex-col justify-start items-start p-4 gap-4 max-h-[70vh] min-h-[70vh]">
        <div className="flex justify-between items-center w-full px-3 py-5 bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7B34EF] hover:from-[#751DDA] hover:to-[#D740FF] rounded-[20px] border border-[#B386FB]">
          <div className="flex justify-center items-center">
            <img src="/image/assets/coin.png" alt="" className="w-12 h-12" />
            <h1 className="text-sm text-[#FFC107] ">Your points</h1>
          </div>
          <h1 className="text-white text-4xl font-bold">
            {formatNumberWithCommas(token)}
          </h1>
        </div>
        <div className="flex justify-start">
          <h1 className="text-white text-xl">Buy Boosters&nbsp;&nbsp;<span className="text-white text-sm">Reset at 00:00 AM UTCC</span></h1>
        </div>
        <div
          className={`w-full flex my-3 px-3 py-3 justify-between items-center bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)] rounded-[20px] gap-2`}
          onClick={handleMouseClick}
        >
          <div className="flex justify-center items-center gap-1">
            <img src="/image/assets/fillEnergy.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col gap-1 justify-start items-start">
              <h3 className="text-sm text-white">Energy Refrill 3000 P</h3>
              <h3 className="text-[13px] text-white">
                {refill_energy}/3 available
              </h3>
            </div>
          </div>
          <img src="image/icon/arrowRight.png" alt="" className="w-2 h-4" />
        </div>
        <div
          className={`w-full flex my-3 px-3 py-3 justify-between items-center bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#A944FD] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2`}
          onClick={handleOpenDoublePointsModal}>
          <div className="flex justify-center items-center gap-1">
            <img src="/image/assets/doublePoint.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col gap-1 justify-start items-start">
              <h3 className="text-sm text-white">Double Points for 15 Minutes 5000 P</h3>
              <h3 className="text-[13px] text-white">
                {double_points}/3 available
              </h3>
            </div>
          </div>
          <img src="image/icon/arrowRight.png" alt="" className="w-2 h-4" />
        </div>
      </div>
      <Footer />
      <Modal isOpen={isRefillEnergyModalOpen} onClose={handleCloseRefillEnergyModal}>
        <div className="flex flex-col items-center align-middle gap-3">
          <img src="image/assets/fillEnergyModal.png" alt="" className=" w-auto h-[80%]" />
          <h1 className="text-2xl text-white">Energy Refill</h1>
          <p className=" text-sm text-white">
            Refill your energy bar instantly for 3,000 points. Maximum of 3 purchases per day
          </p>
          <div
            className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={handleRefillEnergy}
          >
            <span className="flex justify-center items-center text-white text-xl">Get</span>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isDoublePointsModalOpen} onClose={handleCloseDoublePointsModal}>
        <div className="flex flex-col items-center align-middle gap-3 rounded-[20px]">
          <img src="image/assets/doublePointsModal.png" alt="" className=" w-auto h-[80%]" />
          <h1 className="text-2xl text-white">Double Points</h1>
          <p className=" text-sm text-white">
            Double your points earned for the next 15 minutes for 5,000 points. Maximum of 3 purchases per day.
          </p>
          <div
            className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3" onClick={handleDoublePoints}
          >
            <span className="flex justify-center items-center text-white text-xl">Get</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
