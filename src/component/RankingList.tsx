import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { getAllUsers } from "../store/reducers/wallet";
export default function RankingList() {
  const users_state = useSelector((state) => state.wallet.users);
  const [usersa, setUsers] = useState(users_state);
  useEffect(() => {
    dispatch(getAllUsers()).then(() => {
      setUsers(users_state)
    })
  },[users_state])
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  return (
    <div className="md:w-full h-[65vh] mx-auto p-4">
      <div className="max-h-[50vh] max-sm:max-h-[50vh] overflow-auto">
        <div className="flex px-3 py-1 text-white text-lg font-bold justify-start align-middle overflow-y-hidden ml-3">
          <div className="text-start w-[20%] flex justify-center">Rank</div>
          <div className="text-start w-[55%] flex justify-center">User</div>
          <div className="text-start w-[20%] flex justify-center">$Mystery</div>
        </div>
        {usersa.map((data, index) => (
          <div
            key={index}
            className={`flex ${
              index > 0 && "my-3"
            } px-3 py-2 items-center bg-[#363636] rounded-lg`}
          >
            <div className="text-xl text-start pl-2 w-[20%] text-white flex justify-center align-middle">
              {index == 0 ? (
                <img src="image/crown.png" alt="" width={30} height={30} />
              ) : index == 1 ? (
                <img src="image/trophy.png" alt="" width={30} height={30} />
              ) : index == 2 ? (
                <img src="image/star.png" alt="" width={30} height={30} />
              ) : (
                index + 1
              )}
            </div>
            <div className="relative h-10 overflow-hidden w-[60%] flex items-center justify-start">
              <img src="/image/mikeT.png" alt="avatar" className="w-10 h-10" />
              <p className="text-xl text-start pl-2 text-white">{data.username}</p>
            </div>

            <p className="text-xl text-start pl-2 w-[30%] text-white">
              {formatNumberWithCommas(data.balance)}
            </p>
          </div>
        ))}
      </div>
      <hr className="my-3 border-[#363636] border-2" />
      <div
        className={`flex my-3 px-3 py-2 items-center bg-[#5A4C3B] rounded-lg`}
      >
        <div className="text-xl text-start pl-2 w-[20%] text-white">
          1
        </div>
        <div className="relative h-12 overflow-hidden w-[60%] flex items-center">
          <img src="/image/mikeT.png" alt="avatar" className="w-10 h-10" />
          <p className="text-xl text-start pl-2 text-white">{usersa[0]?.username}</p>
        </div>

        <p className="text-xl text-start pl-2 w-[30%] text-white">
          {formatNumberWithCommas(usersa[0]?.balance)}
        </p>
      </div>
    </div>
  );
}
