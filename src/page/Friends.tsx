/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, dispatch } from "../store";
import { updateEnergy,updateTapLevel,updateLimit } from "../store/reducers/wallet";
import {  levelTargets, energyLimit } from "../data";

import { useEffect, useState } from "react";
import toast, { Toaster,useToasterStore  } from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import  { initUtils } from "@telegram-apps/sdk"
import axios from "../utils/api";
import "../css/font.css";
// import { users } from "../data";
// import Modal from "../component/modal";
import Footer from "../component/Footer";

const TOAST_LIMIT = 1;

export default function Friends() {
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const utils = initUtils();
  const username_state = useSelector((state) => state.wallet.user?.username);
  const [username, setUsername] = useState<string>(username_state);
  const [friends, setFriends] = useState<any[]>([
    {username:"Salng"},{
      username:"dsfsdf"
    },
    {username:"Salng"},{
      username:"dsfsdf"
    }
  ]);
  const [textToCopy, setTextToCopy] = useState<string>("");
  // const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
  
  const [tapLevel, setTapLevel] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState<number>(5000);
  const [limit, setLimit] = useState<number>(0);


  const user = useSelector((state) => state.wallet.user);

  useEffect(() => {
    for (let i: number = 0; i < levelTargets.length; i++) {
      if (user.balance < levelTargets[i]) {
        dispatch(updateTapLevel(username, i));
        dispatch(updateLimit(username, energyLimit[i - 1]));
        setTapLevel(i);
        setLimit(energyLimit[i - 1]);
        break;
      }
    }
    console.log('====================================');
    console.log('user.balance', user.balance);
    console.log('Index', limit);
    console.log('tap_level', tapLevel);
    console.log('====================================');
    setRemainedEnergy(user.energy);
  },[])

  useEffect(() => {
    if (tapLevel != 0) {
      const interval = setInterval(() => {
        if (username && remainedEnergy < limit) {
          dispatch(updateEnergy(username, remainedEnergy + tapLevel));
          setRemainedEnergy(remainedEnergy + tapLevel);
        }
        // if (remainedEnergy > limit) {
        //   dispatch(updateEnergy(username, limit));
        //   setRemainedEnergy(limit);
        // }
      // }, (11 - tapLevel) * 1000);
      },  1000);
      return () => clearInterval(interval);
    }
  }, [username, remainedEnergy, limit, tapLevel]);







  const { toasts } = useToasterStore();

  useEffect(() => {
    
    if (toasts.length > TOAST_LIMIT) {
      const excessToasts = toasts.slice(0, toasts.length - TOAST_LIMIT);
      excessToasts.forEach(t => toast.dismiss(t.id));
    }
  }, [toasts]);


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
    // setIsInviteModal(true);
     utils.openTelegramLink(`https://t.me/share/url?url=https://t.me/cashtreeTele_bot?start=${username}`)
  };
  // const handleCloseInviteModal = () => {
  //   setIsInviteModal(false);
  // }
  console.log("friends", friends, friends.length);
  console.log("textToCopy", textToCopy);
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <Toaster
      toastOptions={{
        className: 'w-full rounded-[20px] fade-toast',
        success: {
          className:' w-full rounded-[20px] fade-toast',
          style: {
            position:"absolute",
            top:"180px",
            left:"0%",
            // animation:"ease-in .5s",
            // transition: 'opacity 0.5s ease-in-out',
            animationName:"toaster",
            animationDuration: "5s",
            border:"none",
            borderRadius:"20px",
            background: "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
          },
        },
        error: {
          className:'w-full rounded-[20px] fade-toast',
          style: {
            position:"absolute",
            top:"180px",
            left:"0%",
            // animation:'ease-in .5s',
            // transition: 'opacity 0.5s ease-in-out',
            animationName:"toaster",
            animationDuration: "5s",
            border:"none",
            borderRadius:"20px",
            background: "linear-gradient(340deg,rgba(243, 243, 243, 1),rgba(255, 255, 255, 1))",
          },
          
        },
      }}
      />
      <div className="p-5 flex flex-col justify-center items-center gap-5 w-full h-[90%] mt-8">
        <div className="flex flex-col gap-[6px] w-full justify-center items-center text-[32px] leading-[35px] text-white font-bold">
          Invite Friends
          <div className="flex w-full justify-center items-center gap-[6px] font-medium">
            <p className="text-sm text-white">
              You and your friend will receive bonuses
            </p>
            <img
              src="image/friends/info.png"
              alt="info"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        <div className="flex w-full h-[80px] my-[10px] justify-between px-3 py-3 items-center rounded-[17px] bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#6929F1] to-[#AA45FE]">
          <div className="flex justify-center items-center gap-3">
            <img src="image/friends/friends.png" alt="" className="w-10 h-10" />
            <div className="flex flex-col justify-start items-start">
              <h3
                className="flex justify-center items-center gap-[6px] text-white text-[16px]"
                style={{ fontFamily: "archivo-bold" }}
              >
                Invite a friend
                <img
                  src="image/friends/info.png"
                  alt="info"
                  className="w-[14px] h-[14px]"
                />
              </h3>
              <h1 className="text-white text-[10px] ">
                For you and your friend
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center gap-1">
            <img src="image/assets/coin.png" alt="coin" className="w-5 h-5" />
            <h1
              className="text-[white] text-[16px]"
              style={{ fontFamily: "archivo-bold" }}
            >
              +{formatNumberWithCommas(25000)}
            </h1>
          </div>
        </div>
        <div className="flex w-full justify-start items-center">
          <p
            className="text-[17px] text-white"
            style={{ fontFamily: "archivo-bold" }}
          >
            List of your friends &#40; {friends.length} &#41;
          </p>
        </div>
        {friends.length > 0 ? (
          <div className="min-h-[45%] overflow-y-auto w-full max-h-[45%] ">
            {friends.map((friend, index) => (
              <div
                key={index}
                className={`w-full rounded-[17px] p-[1px] mb-[10px]`}
                style={{
                  background:
                    "linear-gradient(340deg,rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.3)",
                }}
              >
                <div
                  key={index}
                  className="flex w-full h-[70px] justify-between px-3 py-3 items-center rounded-[17px] bg-[linear-gradient(340deg,_var(--tw-gradient-stops))] from-[#240C4D] to-[#8137F9]"
                >
                  <div className="flex justify-center items-center gap-3">
                    <img
                      src="image/friends/friend.png"
                      alt=""
                      className="w-10 h-10"
                    />
                    <div className="flex flex-col justify-start items-start">
                      <h1 className="text-white text-[14px] leading-[21px]" style={{ fontFamily: "archivo-bold" }}>
                        {friend.username}
                      </h1>
                      <h1 className="text-white text-[10px] leading-[13px]">silver 1.01M</h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <img
                      src="image/assets/coin.png"
                      alt="coin"
                      className="w-5 h-5"
                    />
                    <h1
                      className="text-[white] text-[16px]"
                      style={{ fontFamily: "archivo-bold" }}
                    >
                      +25.000
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full justify-center items-start min-h-[45%] max-h-[45%]">
            <div className="flex w-full h-[56px] justify-center items-center py-4 bg-[#120F29] rounded-[14px]">
              <p className="text-[#ABA7BA] text-sm">
                You haven't invited anyone yet
              </p>
            </div>
          </div>
        )}
        <div className="flex w-full justify-between items-center gap-3">
          <div
            className="w-full h-[56px] bg-[#7520FF] text-white rounded-[10px] flex justify-center items-center py-3"
            onClick={handleOpenInviteModal}
          >
            <span className="flex justify-center items-center text-white text-xl leading-[29px] font-semibold">
              Invite Now
            </span>
          </div>
          <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
            <div className="w-[80px] h-[56px] bg-[#7520FF] rounded-[10px] flex justify-center items-center py-2">
              <img src="image/friends/invite.png" alt="" className="w-6 h-6" />
            </div>
          </CopyToClipboard>
        </div>
        {/* <Modal isOpen={isInviteModal} onClose={handleCloseInviteModal}>
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
        </Modal> */}
      </div>
      <Footer />
    </div>
  );
}
