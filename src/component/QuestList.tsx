/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "../store";
import { /*toast,*/ ToastContainer } from "react-toastify";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "../utils/api";
import "../css/font.css";
import Modal from "./modal";
export default function QuestList() {
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [friends, setFriends] = useState<any[]>([]);
  const [textToCopy, setTextToCopy] = useState<string>("");
  const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
  useEffect(() => {
    setUsername(username_state);
    setTextToCopy(`https://t.me/generalTelegram_bot?start=${username_state}`);
  }, [username_state]);
  // const handleCopy = async () => {
  //   toast.success("Copied to clipboard!");
  // };
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
    <div className="p-5 flex flex-col justify-center items-center gap-4 w-full">
      <ToastContainer />
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
          <h1 className="text-[#FFC107] text-sm">+25.000</h1>
        </div>
      </div>
      <div className="flex w-full justify-start items-center">
        <p className="text-lg text-white font-bold">List of your friends {friends.length}</p>
      </div>
      {
        friends.length > 0 ? (
          <div className="min-h-[45vh] overflow-y-auto w-full">
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
          <div className="flex w-full justify-center items-start min-h-[45vh]">
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
        <div className="w-[10%] bg-[#7520FF] rounded-[10px] flex justify-center items-center py-2">
          <img src="image/friends/invite.png" alt="" className="w-6 h-6"/>
        </div>
      </div>
      <Modal isOpen={isInviteModal} onClose={handleCloseInviteModal}>
          <div className="flex flex-col items-center align-middle gap-3 rounded-[20px]">
            <h1 className="text-2xl text-white">Share to</h1>
            <p className=" text-sm text-white">
              Select chat
            </p>
            <div className="w-[90%] flex justify-start items-center py-2 px-2 bg-[#3B1E6A] rounded-[30px]">
              <img src="image/friends/search.png" alt="" className="w-5 h-5"/>
              <input type="text" className="bg-[#3B1E6A] outline-none border-none w-[90%] text-[#ABA7BA]" placeholder="Search"/>
            </div>
            <div className="w-[90%] flex justify-center items-center gap-3">
              <textarea name="sendInvite" id="sendInvite" rows={3} className="bg-[#3B1E6A] rounded-[20px] w-full"></textarea>
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
      {/* <div className="flex justify-center items-center align-middle w-full mt-8">
        <div className="w-[90%] bg-gradient-to-r from-[#57676D] to-[#2A383C]  text-white rounded-[20px] flex items-center justify-between p-5 border border-[white]">
          <div className="flex flex-col justify-center items-center gap-2">
            <span
              className="flex justify-center items-cente text-2xl"
              style={{ fontFamily: "spicy" }}
            >
              My invite link
            </span>
            <span
              className="text-[#00E9F8]"
              style={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {textToCopy}
            </span>
          </div>
          <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
            <div className="bg-gradient-to-r flex justify-center items-center gap-5 from-[#806FC0] to-[#14D6F0] p-3 rounded-[8px]">
              <img src="/image/assets/copy.png" alt="" className="w-4 h-4" />
              <h2
                className="text-sm text-[white]"
                style={{ fontFamily: "poppins" }}
              >
                Copy
              </h2>
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-[90%]">
        <div className="flex justify-start items-center w-full">
          <h2
            className="text-white text-3xl mb-6"
            style={{ fontFamily: "spicy" }}
          >
            My Refferals :
          </h2>
        </div>
        <div className="flex justify-center items-center w-full">
          {friends.length == 0 ? (
            <div className="flex flex-col justify-center items-center gap-9 ">
              <h2
                className="text-[white] text-xl"
                style={{ fontFamily: "poppins" }}
              >
                You don't have refferal!
              </h2>
              <img
                src="image/assets/noRefferal.png"
                alt=""
                className="w-7 h-7"
              />
            </div>
          ) : (
            <div className="max-h-[30vh] max-sm:max-h-[30vh] overflow-auto w-full">
              {friends.map((item, index) => (
                <div
                  key={index}
                  className={`flex ${index > 0 && "my-3"
                    } px-3 py-2 items-center bg-gradient-to-r from-[#567481] to-[#2D4047] rounded-lg w-[70%] text-[white]`}
                >
                  {item["friend"]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
