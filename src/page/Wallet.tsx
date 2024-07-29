import Footer from "../component/Footer";
import { ToastContainer } from "react-toastify"
import { useState } from "react"
import "../css/font.css"
import Modal from "../component/modal";
export default function WalletPage() {
  const [isWalletModal, setIsWalletModal] = useState<boolean>(false)
  const handleCloseWalletModal = () => {
    setIsWalletModal(false)
  }
  const handleOpenWalletModal = () => {
    return setIsWalletModal(true)
  }

  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <div className="flex justify-between items-center px-3 w-full">
          <img src="image/icon/back.png" alt="" className=" w-4 h-4" />
          <h3
            className="text-sm text-[white]"
            style={{ fontFamily: "archivo" }}
          >
            Cashtree Tap to Win
          </h3>
          <img src="image/icon/menu.png" alt="" className=" w-5 h-5" />
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <img src="image/wallet/cointap.png" alt="" className="w-48 h-48" />
          <div className="text-3xl text-white font-[Archivo] font-bold">Wallet</div>
          <div className="text-sm text-white font-[Archivo]">Your wallet connect address</div>
        </div>
        <div className="flex flex-col w-full justify-start items-center gap-4">
          <div className="flex justify-start text-white text-[17px] font-[Archivo] w-full">Task List</div>
          <div className="flex flex-row justify-between items-center bg-gradient-to-br from-[#AE47FF] to-[#6929F1] w-full h-16 rounded-2xl px-1" onClick={() => handleOpenWalletModal()}>
            <img src="image/wallet/connectWallet.png" alt="" className="w-10 h-10"/>
            <div className="flex-7 flex flex-col gap-1 justify-start items-center">
              <div className="text-white font-[Archivo] text-sm">Connect your CTT wallet address</div>
              <div className="text-white font-[Archivo] text-xs">Integrate now for Secure Transactions</div>
            </div>
            <div className="flex-1 flex justify-end">
              <img src="image/wallet/Vector.png" alt="" className="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal isOpen={isWalletModal} onClose={handleCloseWalletModal}>
        <div className="flex flex-col items-center align-middle gap-3 rounded-[20px]">
          <img src="image/wallet/cointap.png" alt="" className=" w-auto h-[80%]" />
          <h1 className="text-2xl text-white">Connet your Wallet address</h1>
          <p className=" text-sm text-white">
            Connect your crypto wallet. If you don't have one, create it in your Telegram account.
          </p>
          <div
            className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
          >
            <span className="flex justify-center items-center text-white text-xl">Connect Now</span>
          </div>
          <div
            className="w-[80%] text-[#C8A2FB] rounded-[10px] flex justify-center items-center py-3"
          >
            <span className="flex justify-center items-center text-[#C8A2FB] text-sm">Cancel</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
