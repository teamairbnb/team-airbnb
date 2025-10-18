import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import car from "../assets/blackcar.svg";
import arrow from "../assets/arrowdn.svg";


export default function EditCarDetails() {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSeatDropdownOpen, setIsSeatDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");

  const typeRef = useRef(null);
  const seatRef = useRef(null);

  const carTypes = ["SUV", "Sedan", "Truck", "Family Car"];
  const seatNums = ["2", "4", "5+"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        typeRef.current &&
        !typeRef.current.contains(event.target) &&
        seatRef.current &&
        !seatRef.current.contains(event.target)
      ) {
        setIsTypeDropdownOpen(false);
        setIsSeatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="px-4 py-8">
      <div className="relative flex items-center justify-center">
        <Link to="/BusinessOwnerDashboard" className="absolute left-0">
          <div className="cursor-pointer inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black">
            <img className="w-4" src={back} alt="Back" />
          </div>
        </Link>

        <p className="text-[20px] font-semibold">
          <span className="text-[#6B7280]">Cars / </span>Edit
        </p>
      </div>

      <div className="flex justify-center">
        <img src={car} alt="" className="mt-[70px]" />
      </div>

      {/* Model */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Model</p>
        <input
          type="text"
          placeholder="Enter Model Name"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Engine */}
      <div className="mt-[35px] text-start">
        <p className="text-[17px] font-semibold">Engine</p>
        <input
          type="text"
          placeholder="Enter Engine Name"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Year */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Year</p>
        <input
          type="text"
          placeholder="Enter Year"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* License Plate */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">License Plate</p>
        <input
          type="text"
          placeholder="Enter Plate No"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Type Dropdown */}
      <div className="mt-[25px] text-start relative" ref={typeRef}>
        <p className="text-[17px] font-semibold">Type</p>
        <div
          onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
          className="relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedType ? "text-black" : "text-[#9CA3AF]"}>
            {selectedType || "Select Type"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isTypeDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isTypeDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {carTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(type);
                  setIsTypeDropdownOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seat Dropdown */}
      <div className="mt-[25px] text-start relative" ref={seatRef}>
        <p className="text-[17px] font-semibold">Seat Number</p>
        <div
          onClick={() => setIsSeatDropdownOpen((prev) => !prev)}
          className="relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedSeat ? "text-black" : "text-[#9CA3AF]"}>
            {selectedSeat || "Select Seat Number"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isSeatDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isSeatDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {seatNums.map((num, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedSeat(num);
                  setIsSeatDropdownOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Daily Price</p>
        <input
          type="text"
          placeholder="Enter Price in your currency"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      <div className="mt-[34px]">
        <button className="bg-[#2563EB] w-full rounded-[10px] text-white py-4">
          Done
        </button>
      </div>
    </div>
  );
}
