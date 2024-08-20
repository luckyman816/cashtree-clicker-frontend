import { dispatch, useSelector } from "../store";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import {
  updateWallet,
  getWallet,
  updateBalance,
} from "../store/reducers/wallet";

// import {levelTargets, energyLimit} from "../data";
import {
  getDailyBoost,
  updateDoublePoints,
  updateRefillEnergy,
} from "../store/reducers/dailyBoost";
// import { updateTapLevel, updateLimit } from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import Modal from "../component/modal";
import Footer from "../component/Footer";
import moment from "moment";

const TOAST_LIMIT = 1;

export default function Boost() {
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const limit_state = useSelector((state) => state.wallet.user?.limit);
  const tapLevelState = useSelector((state) => state.wallet.user?.tap_level);
  const refill_energy_state = useSelector(
    (state) => state.dailyBoost.daily_refill_energy?.refill_energy
  );
  const double_points_state = useSelector(
    (state) => state.dailyBoost.daily_double_points?.double_points
  );
  const refill_energy_date_state = useSelector(
    (state) => state.dailyBoost.daily_refill_energy?.refill_energy_date
  );
  const double_points_date_state = useSelector(
    (state) => state.dailyBoost.daily_double_points?.double_points_date
  );
  const [token, setToken] = useState<number>(tokenState);
  const [username, setUsername] = useState<string>(username_state);
  const [limit, setLimit] = useState<number>(limit_state);
  const [refill_energy, setRefillEnergy] =
    useState<number>(refill_energy_state);
  const [refill_energy_date, setRefillEnergyDate] =
    useState<moment.Moment | null>(
      refill_energy_date_state ? moment(refill_energy_date_state) : null
    );
  const [double_points, setDoublePoints] =
    useState<number>(double_points_state);
  const [double_points_date, setDoublePointsDate] =
    useState<moment.Moment | null>(
      double_points_date_state ? moment(double_points_date_state) : null
    );
  useEffect(() => {
    dispatch(getWallet(username));
    dispatch(getDailyBoost(username));
  }, [username]);

  const { toasts } = useToasterStore();

  useEffect(() => {
    if (toasts.length > TOAST_LIMIT) {
      const excessToasts = toasts.slice(0, toasts.length - TOAST_LIMIT);
      excessToasts.forEach((t) => toast.dismiss(t.id));
    }
  }, [toasts]);

  useEffect(() => {
    setToken(tokenState);
    setUsername(username_state);
    setLimit(limit_state);
    setRefillEnergy(refill_energy_state);
    setDoublePoints(double_points_state);
    setRefillEnergyDate(
      refill_energy_date_state ? moment(refill_energy_date_state) : null
    );
    setDoublePointsDate(
      double_points_date_state ? moment(double_points_date_state) : null
    );
  }, [
    tokenState,
    username_state,
    limit_state,
    tapLevelState,
    refill_energy_state,
    double_points_state,
    refill_energy_date_state,
    double_points_date_state,
  ]);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const [diffDaysRefill, setDiffDaysRefill] = useState<number>(0);
  const [diffDaysDouble, setDiffDaysDouble] = useState<number>(0);
  const [diffMinutesDouble, setDiffMinutesDouble] = useState<number>(0);
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
      setDiffMinutesDouble(Math.floor((dateDiffDouble % (60 * 60)) / 60));
    }
  };
  console.log("-----day----->", diffDaysDouble, diffDaysRefill);
  const handleRefillEnergy = () => {
    console.log("-----full energy💰🏆💪------>", limit);
    console.log("-----full energy💰🏆💪???------>", diffDaysRefill);
    if (diffDaysRefill == 0) {
      if (refill_energy + 1 > 3) {
        toast.error("Maximum value reached!");
      } else {
        if (token > 3000) {
          dispatch(updateRefillEnergy(username, refill_energy + 1, moment()));
          dispatch(updateWallet(username, token - 3000, limit));
          // for (let i: number = 0; i < levelTargets.length; i++) {
          //   if ((token - 3000) < levelTargets[i]) {
          //     dispatch(updateTapLevel(username, i));
          //     dispatch(updateLimit(username, energyLimit[i]));
          //     break;
          //   }
          // }
          toast.success("Refilled successfully");
        } else {
          toast.error("Insufficient balance!");
        }
      }
    } else if (diffDaysRefill >= 1) {
      if (token > 3000) {
        dispatch(updateRefillEnergy(username, 1, moment()));
        dispatch(updateWallet(username, token - 3000, limit));
        toast.success("Refilled successfully");
      }
    } else {
      toast.error("Please wait next day!");
    }
    setIsRefillEnergyModalOpen(false);
  };
  const handleDoublePoints = () => {
    if (diffDaysDouble == 0) {
      if (double_points + 1 > 3) {
        toast.error("Maximum value reached!");
      } else {
        if (diffMinutesDouble >= 15) {
          dispatch(updateDoublePoints(username, double_points + 1, moment()));
          dispatch(updateBalance(username, token + 500));
          // for (let i: number = 0; i < levelTargets.length; i++) {
          //   if ((token + 500) < levelTargets[i]) {
          //     dispatch(updateTapLevel(username, i));
          //     dispatch(updateLimit(username, energyLimit[i]));
          //     break;
          //   }
          // }
          toast.success("Get the double points successfully");
        } else {
          toast.error("Please wait for 15 minutes");
        }
      }
    } else if (diffDaysDouble >= 1) {
      dispatch(updateDoublePoints(username, 1, moment()));
      dispatch(updateBalance(username, token + 500));
      // for (let i: number = 0; i < levelTargets.length; i++) {
      //   if ((token + 500) < levelTargets[i]) {
      //     dispatch(updateTapLevel(username, i));
      //     dispatch(updateLimit(username, energyLimit[i]));
      //     break;
      //   }
      // }
      toast.success("Get the double points successfully");
    } else {
      toast.error("Please wait next day!");
    }
    setIsDoublePointsModalOpen(false);
  };
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
  }, []);
  const [isRefillEnergyModalOpen, setIsRefillEnergyModalOpen] =
    useState<boolean>(false);
  const handleMouseClick = () => {
    setIsRefillEnergyModalOpen(true);
  };
  const handleCloseRefillEnergyModal = () => {
    setIsRefillEnergyModalOpen(false);
  };
  const [isDoublePointsModalOpen, setIsDoublePointsModalOpen] =
    useState<boolean>(false);
  const handleOpenDoublePointsModal = () => {
    setIsDoublePointsModalOpen(true);
  };
  const handleCloseDoublePointsModal = () => {
    setIsDoublePointsModalOpen(false);
  };
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <Toaster
        toastOptions={{
          className: "w-full rounded-[20px] fade-toast",
          success: {
            className: " w-full rounded-[20px] fade-toast",
            style: {
              position: "absolute",
              top: "180px",
              left: "0%",
              // animation:"ease-in .5s",
              // transition: 'opacity 0.5s ease-in-out',
              animationName: "toaster",
              animationDuration: "5s",
              border: "none",
              borderRadius: "20px",
              background:
                "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
            },
          },
          error: {
            className: "w-full rounded-[20px] fade-toast",
            style: {
              position: "absolute",
              top: "180px",
              left: "0%",
              // animation:'ease-in .5s',
              // transition: 'opacity 0.5s ease-in-out',
              animationName: "toaster",
              animationDuration: "5s",
              border: "none",
              borderRadius: "20px",
              background:
                "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
            },
          },
        }}
      />
      <div className="w-full mt-3 flex flex-col justify-start items-start p-4 gap-4 max-h-[75vh] min-h-[75vh]">
        <div
          className={`w-full my-[6px] p-[1px] rounded-[20px]`}
          style={{
            background:
              "linear-gradient(340deg,rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.4)",
          }}
        >
          <div className="flex justify-between items-center w-full px-3 py-5 bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#2A0E58] to-[#7B34EF] hover:from-[#751DDA] hover:to-[#D740FF] rounded-[20px] border-none">
            <div className="flex justify-center items-center">
              <img src="/image/assets/coin.webp" alt="" className="w-12 h-12" />
              <h1 className="text-sm text-[#FFC107] ">Your points</h1>
            </div>
            <h1 className="text-white text-4xl font-bold">
              {formatNumberWithCommas(token)}
            </h1>
          </div>
        </div>
        <div className="flex justify-start">
          <h1 className="text-white text-xl">
            Buy Boosters&nbsp;&nbsp;
            <span className="text-white text-sm">Reset at 00:00 AM UTCC</span>
          </h1>
        </div>
        <div className="flex flex-col gap-3 w-full my-3">
          <div
            className={`w-full flex px-3 py-3 justify-between items-center bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#AE47FF] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)] rounded-[20px] gap-2`}
            onClick={handleMouseClick}
          >
            <div className="flex justify-center items-center gap-1">
              <img
                src="/image/assets/fillEnergy.webp"
                alt=""
                className="w-10 h-10"
              />
              <div className="flex flex-col justify-start items-start">
                <h3 className="text-sm text-white">Energy Refrill 3000 P</h3>
                <h3 className="text-[13px] text-white">
                  {refill_energy}/3 available
                </h3>
              </div>
            </div>
            <img src="image/icon/arrowRight.webp" alt="" className="w-2 h-4" />
          </div>
          <div
            className={`w-full flex px-3 py-3 justify-between items-center bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#6E1BD8] to-[#D940FF] hover:bg-[linear-gradient(0.5turn, #711CD9, #CD3CFB)]  rounded-[20px] gap-2`}
            onClick={handleOpenDoublePointsModal}
          >
            <div className="flex justify-center items-center gap-1">
              <img
                src="/image/assets/doublePoint.webp"
                alt=""
                className="w-10 h-10 drop-shadow-[0_20px_50px_#7131D6]"
              />
              <div className="flex flex-col justify-start items-start">
                <h3 className="text-sm text-white">
                  Double Points for 15 Minutes 5000 P
                </h3>
                <h3 className="text-[13px] text-white">
                  {double_points}/3 available
                </h3>
              </div>
            </div>
            <img src="image/icon/arrowRight.webp" alt="" className="w-2 h-4" />
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isRefillEnergyModalOpen}
        onClose={handleCloseRefillEnergyModal}
      >
        <div className="flex flex-col items-center align-middle rounded-[20px] gap-5 my-5 h-full pl-[18px]">
          <img
            src="image/assets/fillEnergyModal.webp"
            alt=""
            className=" w-auto h-[50%] drop-shadow-[0_20px_50px_#7131D6]"
          />
          <h1 className="text-2xl text-white">Energy Refill</h1>
          <p className=" text-sm text-white">
            Refill your energy bar instantly for 3,000 points. Maximum of 3
            purchases per day
          </p>
          <div
            className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={handleRefillEnergy}
          >
            <span className="flex justify-center items-center text-white text-xl">
              Get
            </span>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDoublePointsModalOpen}
        onClose={handleCloseDoublePointsModal}
      >
        <div className="flex flex-col items-center align-middle rounded-[20px] gap-5 my-5 h-full pl-[18px]">
          <img
            src="image/assets/doublePointsModal.webp"
            alt=""
            className=" w-auto h-[50%]"
          />
          <h1 className="text-2xl text-white">Double Points</h1>
          <p className=" text-sm text-white">
            Double your points earned for the next 15 minutes for 5,000 points.
            Maximum of 3 purchases per day.
          </p>
          <div
            className="w-full bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={handleDoublePoints}
          >
            <span className="flex justify-center items-center text-white text-xl">
              Get
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
