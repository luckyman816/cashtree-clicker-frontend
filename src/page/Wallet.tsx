import { useEffect, useState } from "react";
import { useSelector } from "../store";
import axios from "../utils/api";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Footer from "../component/Footer";
const web3 = new Web3("https://bsc-dataseed.binance.org/");
export default function Wallet() {
  const username_state = useSelector((state) => state.wallet.user.username);
  const [username, setUsername] = useState(username_state);
  const [address, setAddress] = useState<string>("");
  const [textToCopy, setTextToCopy] = useState<string>("");
  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(address);
  }, [username_state, address]);
  const isValidBEP20Address = (address: string) => {
    try {
      return web3.utils.isAddress(address);
    } catch (error) {
      console.error("Error verifying BEP20 address:", error);
      return false;
    }
  };
  const handleCopy = async () => {
    toast.success("Copied to clipboard!");
  };
  const handleSaveAddress = () => {
    if (isValidBEP20Address(address)) {
      try {
        axios
          .post("/walletAddress/add", {
            username: username,
            address: address,
            chain: "BNB",
          })
          .then(() => {
            toast.success("Successfully added address!");
          }).catch(() => {
            toast.warning("Address is already saved");
          });
      } catch (error) {
        if (error) {
          toast.warning("Address is already saved");
        }
      }
    } else {
      toast.warning("Address is invalid");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="Ranking w-full h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-5 w-full mt-11">
          <img src="image/assets/wallet.png" alt="" className="w-24 h-24" />
          <h2 className="text-sm text-[white]">
            Submit your bep20 wallet address
          </h2>
          <div className="flex w-[80%] relative">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" bg-gradient-to-r from-[#556166] to-[#293337] p-4 border border-[white] border-solid rounded-[10px] w-full"
            />
            <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
              <img
                src="image/icon/input.png"
                alt=""
                className="absolute top-[30%] right-[10px] w-5 h-5"
              />
            </CopyToClipboard>
          </div>
          <button
            className="bg-[#33CC66] text-[white] w-[fit-content] rounded-[10px] flex justify-center items-center text-xl gap-2 p-2"
            onClick={handleSaveAddress}
          >
            <img src="image/icon/submit.png" alt="" className=" w-6 h-6 " />
            Submit
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
