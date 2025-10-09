import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Info } from "lucide-react";
import back from "../assets/back.svg";

export default function PickUp() {
  const location = useLocation();
  const carName = location.state?.carName || "";

  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/ReviewBooking", {
      state: {
        pickUpDate,
        pickUpTime,
        returnDate,
        returnTime,
        carName, 
      },
    });
  };

  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        <Link
          to="/car-booking"
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Select pick-up</p>

        {/* Pick-up & Return Address */}
        <div className="px-[5px] mt-[25px]">
          <p>Pick-up & return</p>
          <div className="w-full flex items-center justify-between border border-[#D3D3D3] rounded-[8px] mt-4 py-[14px] px-[16px]">
            <p className="text-[14px] text-[#717171]">company pickup address</p>
            <Info className="w-4 h-4 text-[#717171] ml-2" />
          </div>
        </div>

        {/* Date and Time Section */}
        <div className="bg-white p-[5px] rounded-2xl shadow-sm mt-[60px]">
          <div className="grid grid-cols-2 gap-4">
            {/* Pick-up */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium">Pick-up</label>
              <div className="border border-gray-200 rounded-xl mt-[16px] p-3">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="date"
                    value={pickUpDate}
                    onChange={(e) => setPickUpDate(e.target.value)}
                    className="outline-none w-full bg-transparent text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={pickUpTime}
                    onChange={(e) => setPickUpTime(e.target.value)}
                    className="outline-none w-full bg-transparent text-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Return */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium">Return</label>
              <div className="border border-gray-200 rounded-xl mt-[16px] p-3">
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="outline-none w-full bg-transparent text-gray-700"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="outline-none w-full bg-transparent text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="block w-full my-4 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
}
