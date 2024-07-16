import { dispatch, useSelector } from "../store";
import { toast, ToastContainer } from "react-toastify";
import {
  updateBalance,
  updateEnergy,
  updateFullEnergy,
  updateLimit,
  updateTap,
  getWallet,
} from "../store/reducers/wallet";
import { useEffect, useState } from "react";
import Modal from "../component/modal";
import Footer from "../component/Footer";
export default function Boost() {
  const tokenState = useSelector((state) => state.wallet.user?.balance);
  const username_state = useSelector((state) => state.wallet.user?.username);
  const limit_state = useSelector((state) => state.wallet.user?.limit);
  const tap_state = useSelector((state) => state.wallet.user?.tap);
  const full_energy_state = useSelector(
    (state) => state.wallet.user?.full_energy
  );
  const [token, setToken] = useState<number>(tokenState);
  const [username, setUsername] = useState<string>(username_state);
  const [limit, setLimit] = useState<number>(limit_state);
  const [tap, setTap] = useState<number>(tap_state);
  const [full_energy, setFullEnergy] = useState<number>(full_energy_state);
  useEffect(() => {
    dispatch(getWallet(username));
  }, [username]);
  useEffect(() => {
    setToken(tokenState);
    setUsername(username_state);
    setLimit(limit_state);
    setTap(tap_state);
    setFullEnergy(full_energy_state);
  }, [tokenState, username_state, limit_state, tap_state, full_energy_state]);
  const handleFullEnergy = () => {
    console.log("-----full energy💰🏆💪------>", limit_state);
    if (full_energy > 6) {
      toast.warning("Full energy limit reached!");
    } else {
      dispatch(updateFullEnergy(username, full_energy + 1)).then(() => {
        dispatch(updateEnergy(username, limit));
        toast.success("Successfully updated energy!");
      });
    }
    setIsModalOpen(false);
  };
  const handleMultiTap = () => {
    if (tap >= 32) {
      toast.warning("Tap limit reached!");
    } else {
      if (token < 2000) {
        toast.warning("Not enough token!");
      } else {
        dispatch(updateTap(username, tap * 2)).then(() => {
          dispatch(updateBalance(username, token - 2000));
          toast.success("Successfully updated tap!");
        });
      }
    }
    setIsTapModalOpen(false);
  };
  const handleLimit = () => {
    if (limit >= 5000) {
      toast.warning("Energy limit reached!");
    } else {
      if (token < 2000) {
        toast.warning("Not enough token!");
      } else {
        dispatch(updateLimit(username, limit + 1000)).then(() => {
          dispatch(updateBalance(username, token - 2000));
          toast.success("Successfully updated limit!");
        });
      }
    }
    setIsLimitModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleMouseClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isTapModalOpen, setIsTapModalOpen] = useState<boolean>(false);
  const handleMouseTapClick = () => {
    setIsTapModalOpen(true);
  };
  const handleCloseTapModal = () => {
    setIsTapModalOpen(false);
  };

  const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false);
  const handleMouseLimitClick = () => {
    setIsLimitModalOpen(true);
  };
  const handleCloseLimitModal = () => {
    setIsLimitModalOpen(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="Boost h-full w-full flex flex-col justify-between items-center">
        <div className="w-full mt-11 flex flex-col justify-center p-4">
          <div className="flex flex-col justify-center items-center">
            <div className="flex px-3 py-1 gap-5 text-white text-lg font-bold justify-center align-middle overflow-y-hidden">
              <img src="/image/dollar.png" alt="" className="w-10 h-10" />
              <h1 className="text-4xl">{token}</h1>
            </div>
          </div>
          <hr className="my-3 border-[#363636] border-1" />
          <div className="flex justify-start">
            <h1 className="text-white text-xl">Free daily boosters</h1>
          </div>
          <div
            className={`flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] hover:bg-[#3a3a3a]`}
            onClick={handleMouseClick}
          >
            <img src="/image/icon/lightning.svg" alt="" className="w-10 h-10" />
            <div className="flex flex-col">
              <h3 className="text-2xl text-white">Full energy</h3>
              <h3 className="text-xl text-[#a8a8a7]">
                {full_energy}/6 available
              </h3>
            </div>
          </div>
          <div className="flex justify-start">
            <h1 className="text-white text-xl">Boosters</h1>
          </div>
          <div
            className={`flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`}
            onClick={handleMouseTapClick}
          >
            <img src="/image/double-tap.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl text-white text-left">Multitap</h3>
              <div className="flex gap-3 align-middle">
                <img src="/image/dollar.png" alt="" className="w-5 h-5" />
                <h3 className="text-[#a8a8a7] text-xl">2K * 2M</h3>
              </div>
            </div>
          </div>
          <div
            className={`flex my-3 px-5 py-3 items-center bg-gradient-to-r from-[#556165] to-[#293135] rounded-[30px] gap-2 hover:bg-[#3a3a3a]`}
            onClick={handleMouseLimitClick}
          >
            <img src="/image/battery.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl text-white text-left">Energy limit</h3>
              <div className="flex gap-3 align-middle">
                <img src="/image/dollar.png" alt="" className="w-5 h-5" />
                <h3 className="text-[#a8a8a7] text-xl">2K * 2M</h3>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="flex flex-col items-center align-middle gap-3">
            <img src="image/icon/lightning.svg" alt="" className=" w-12 h-12" />
            <h1 className="text-2xl text-white">Full energy</h1>
            <p className=" text-sm text-white">
              Recharge your energy to the maximum and do another round of mining
            </p>
            <div className="flex items-center">
              <img src="image/dollar.png" alt="" className=" w-14 h-14" />
              <h1 className="text-white text-2xl">FREE</h1>
            </div>
            <div
              className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center"
              onClick={handleFullEnergy}
            >
              <span className="flex justify-center items-center">Go ahead</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isTapModalOpen} onClose={handleCloseTapModal}>
          <div className="flex flex-col items-center align-middle gap-3">
            <img src="image/double-tap.png" alt="" className=" w-12 h-12" />
            <h1 className="text-2xl text-white">Multi-Tap</h1>
            <p className=" text-sm text-white">
              Select the Multi-tap, can get the token x 2
            </p>
            <div className="flex items-center">
              <img src="image/dollar.png" alt="" className=" w-14 h-14" />
              <h1 className="text-white text-2xl">-2000</h1>
            </div>
            <div
              className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center"
              onClick={handleMultiTap}
            >
              <span className="flex justify-center items-center">Go ahead</span>
            </div>
          </div>
        </Modal>
        <Modal isOpen={isLimitModalOpen} onClose={handleCloseLimitModal}>
          <div className="flex flex-col items-center align-middle gap-3">
            <img src="image/battery.png" alt="" className=" w-12 h-12" />
            <h1 className="text-2xl text-white">Energy Limit</h1>
            <p className=" text-sm text-white">
              You can increase the Energy Limit, can get the energy x 2
            </p>
            <div className="flex items-center">
              <img src="image/dollar.png" alt="" className=" w-14 h-14" />
              <h1 className="text-white text-2xl">-2000</h1>
            </div>
            <div
              className="w-full h-9 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center"
              onClick={handleLimit}
            >
              <span className="flex justify-center items-center">Go ahead</span>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
