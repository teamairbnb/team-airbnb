import React from "react";
import { useNavigate } from "react-router-dom";
import userimg from "../assets/userimage.svg";
import arrow from "../assets/backarrow.svg";

export default function UserMessageTab() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate("/LiveChat", {
          state: {
            backTo: "/BusinessOwnerDashboard", 
            role: "business",
          },
        })
      }
      className="border py-[17px] px-5 rounded-2xl mt-5 text-[#111827] cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <img className="w-12" src={userimg} alt="user" />
          <div className="text-start text-[15px]">
            <p>User 1</p>
            <div className="flex gap-2 text-[12px] text-center items-center">
              <p className="opacity-55">You have a new message</p>
              <div className="bg-black rounded-full text-white p-1 w-6 h-6 flex items-center justify-center">
                <p>1</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
}
