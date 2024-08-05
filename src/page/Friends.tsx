/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
import "../css/font.css";
import { users } from "../data";
import Modal from "../component/modal";
import Footer from "../component/Footer";

export default function Friends() {
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [friends, setFriends] = useState<any[]>([]);
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/cashtreeTele_bot?start=${username_state}`);
  }, [username_state]);
  const handleCopy = async () => {
    toast.success("Copied to clipboard!");
  };
  useEffect(() => {
    if (username) {
      axios.post(`/friend/${username}`).then((res) => {
        setFriends(res.data);
      });
    }
  });
  const handleOpenInviteModal = () => {
    setIsInviteModal(true);
  }
  const handleCloseInviteModal = () => {
    setIsInviteModal(false);
  }
  console.log("friends", friends, friends.length);
  console.log("textToCopy", textToCopy);
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <Toaster />
      <div className="flex justify-between items-center px-3 w-full py-3">
        <img src="image/icon/back.png" alt="" className=" w-4 h-4" />
        <h3
          className="text-sm text-[white]"
          style={{ fontFamily: "archivo" }}
        >
          Cashtree Tap to Win
        </h3>
        <img src="image/icon/menu.png" alt="" className=" w-5 h-5" />
      </div>
      <div className="p-5 flex flex-col justify-center items-center gap-4 w-full h-[90%]">
        <div className="flex w-full justify-center items-center text-3xl text-white font-bold">
          Invite Friends
        </div>
        <div className="flex w-full justify-center items-center">
          <p className="text-sm text-white">You and your friend will receive bonuses</p>
        </div>
        <div className="flex w-[95%] justify-between px-3 py-3 items-center rounded-[20px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#AA45FE]">
          <div className="flex justify-center items-center gap-3">
            <img src="image/friends/friends.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-white text-xl font-bold">Invite Friends</h1>
              <h1 className="text-white text-sm ">For you and your friend</h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <img src="image/assets/coin.png" alt="coin" className="w-5 h-5" />
            <h1 className="text-[#FFC107] text-sm">+{formatNumberWithCommas(25000)}</h1>
          </div>
        </div>
        <div className="flex w-full justify-start items-center">
          <p className="text-lg text-white font-bold">List of your friends &#40; {friends.length} &#41;</p>
        </div>
        {
          friends.length > 0 ? (
            <div className="min-h-[45%] overflow-y-auto w-full max-h-[45%]">
              {
                friends.map((friend) => (
                  <div className="flex w-[95%] justify-between px-3 py-3 items-center rounded-[20px] bg-[linear-gradient(315deg,_var(--tw-gradient-stops))] from-[#2A0E57] to-[#7B34EE]">
                    <div className="flex justify-center items-center gap-3">
                      <img src="image/friends/friend.png" alt="" className="w-10 h-10" />
                      <div className="flex flex-col justify-start items-start">
                        <h1 className="text-white text-xl font-bold">{friend.username}</h1>
                        <h1 className="text-white text-sm ">silver 1.AM</h1>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <img src="image/assets/coin.png" alt="coin" className="w-5 h-5" />
                      <h1 className="text-[#FFC107] text-sm">+25.000</h1>
                    </div>
                  </div>
                ))

              }

            </div>
          ) : (
            <div className="flex w-full justify-center items-start min-h-[45%] max-h-[45%]">
              <div className="flex w-[95%] justify-center items-center py-4 bg-[#120F29] rounded-[20px]">
                <p className="text-[#ABA7BA] text-sm">You haven't invited anyone yet</p>
              </div>
            </div>
          )
        }
        <div className="flex w-full justify-between items-center gap-3">
          <div
            className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={handleOpenInviteModal}
          >
            <span className="flex justify-center items-center text-white text-xl">Invite Now</span>
          </div>
          <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
            <div className="w-[10%] bg-[#7520FF] rounded-[10px] flex justify-center items-center py-2">
              <img src="image/friends/invite.png" alt="" className="w-6 h-6" />
            </div>
          </CopyToClipboard>
        </div>
        <Modal isOpen={isInviteModal} onClose={handleCloseInviteModal}>
          <div className="flex flex-col items-center align-middle gap-3 rounded-[20px] w-full">
            <h1 className="text-2xl text-white">Share to</h1>
            <p className=" text-sm text-white">
              Select chat
            </p>
            <div className="w-[90%] flex justify-start items-center py-2 px-2 bg-[#3B1E6A] rounded-[30px]">
              <img src="image/friends/search.png" alt="" className="w-5 h-5" />
              <input type="text" className="bg-[#3B1E6A] outline-none border-none w-[90%] text-[#ABA7BA]" placeholder="Search" />
            </div>
            <div className="min-h-[20vh] max-h-[30vh] overflow-y-auto overflow-hidden w-full">
              <div className="flex w-full flex-wrap justify-between items-center">
                {users.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center items-center max-w-20 px-3 py-3">
                    <div className="w-[18vw] h-[18vw] flex justify-center items-center rounded-full text-white text-2xl bg-gradient-to-br from-[#47C8FF] to-[#4756E5]">AB</div>
                    <p className="text-white text-sm whitespace-nowrap overflow-hidden overflow-ellipsis w-full">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[90%] flex justify-center items-center gap-3">
              <textarea name="sendInvite" id="sendInvite" rows={3} className="bg-[#3B1E6A] rounded-[20px] w-full outline-none border-none"></textarea>
            </div>
            <div
              className="w-[80%] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Send Now</span>
            </div>
            <div
              className="w-[80%] bg-[#51229D] text-white rounded-[10px] flex justify-center items-center py-3"
            >
              <span className="flex justify-center items-center text-white text-xl">Cancel</span>
            </div>
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
