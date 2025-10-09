import React, { useState, useRef, useEffect } from "react";
import back from "../assets/back.svg";
import arrow from "../assets/arrowdn.svg";

export default function AddCar({ onBack }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const dropdownRef = useRef(null);

  const carTypes = ["SUV", "Sedan", "Truck", "Family Car"];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const handleSelect = (option) => {
    setSelectedType(option);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="tracking-wide">
      <div className="flex justify-center items-center relative">
        <div
          onClick={onBack}
          className="cursor-pointer left-0 absolute inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </div>

        <p className="text-[20px] font-semibold">
          <span className="text-[#6B7280]">Cars / </span>Add Car
        </p>
      </div>

      <p className="mt-[50px] text-start text-[20px] font-semibold">Car Details</p>

      {/* Make */}
      <div className="mt-[35px] text-start">
        <p className="text-[17px] font-semibold">Make</p>
        <input
          type="text"
          placeholder="Enter Make"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Model */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Model</p>
        <input
          type="text"
          placeholder="Enter Model"
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
      <div className="mt-[25px] text-start relative" ref={dropdownRef}>
        <p className="text-[17px] font-semibold">Type</p>
        <div
          onClick={toggleDropdown}
          className="relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedType ? "text-black" : "text-[#9CA3AF]"}>
            {selectedType || "Select Category"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {carTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => handleSelect(type)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-[34px]">
        <button className="bg-[#2563EB] w-full rounded-[10px] text-white py-4">Next</button>
      </div>
    </div>
  );
}
