import React, { useState } from "react";
import back from "../assets/back.svg";
import increment from "../assets/plus.svg";
import decrement from "../assets/minus.svg";

export default function CarFilterMenu({ isOpen, onClose, onApply, onReset }) {
  const [carYear, setCarYear] = useState(2025);
  const [priceRange, setPriceRange] = useState("");
  const [carType, setCarType] = useState("");

  const incrementYear = () =>
    setCarYear((prev) => (prev < 2025 ? prev + 1 : prev));

  const decrementYear = () =>
    setCarYear((prev) => (prev > 1900 ? prev - 1 : prev));

  const resetFilters = () => {
    setCarYear(2025);
    setPriceRange("");
    setCarType("");
    if (onReset) {
      onReset(); // resets cars list
    }
    onClose(); // closes menu after reset 
  };

  const handleApply = () => {
    onApply({ carYear, priceRange, carType });
    onClose();
  };

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* CarFilter Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-600 py-[10px] pl-[14px] pr-[6px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
          >
            <img src={back} alt="Back" />
          </button>
          <h2 className="font-bold text-[20px] text-[#111827] tracking-wide text-center flex-1">
            Car Filter
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-[28px] text-gray-800">
          {/* Price range */}
          <div className="text-[#111827]">
            <h3 className="font-bold mb-2 text-[19px] tracking-wide">Price range</h3>
            <div className="space-y-[13px] mt-[16px] ml-1">
              {["$0 - $200", "$200 - $400", "$400 - $600", "$600 - $800"].map(
                (range) => (
                  <label key={range} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={priceRange === range}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="text-blue-600 w-[20px] h-[20px]"
                    />
                    <span>{range}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Car Type */}
          <div className="text-[#111827]">
            <h3 className="font-bold mb-2 text-[19px] tracking-wide">Type</h3>
            <div className="space-y-[13px] mt-[16px] ml-1">
              {["SUV", "Sedan", "Truck", "Family Car"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={carType === type}
                    onChange={(e) => setCarType(e.target.value)}
                    className="text-blue-600 w-[20px] h-[20px]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Car year */}
          <div>
            <h3 className="font-bold mb-2 text-[19px] tracking-wide">Car year</h3>
            <div className="flex items-center space-x-2 mt-[16px] ml-1">
              <button
                onClick={incrementYear}
                className="border border-[#D3D3D3] rounded-[10px] p-[12px] text-lg"
              >
                <img src={increment} alt="+" />
              </button>
              <input
                type="text"
                value={carYear}
                readOnly
                className="text-center border border-[#D3D3D3] rounded-[10px] py-[12px]"
              />
              <button
                onClick={decrementYear}
                className="border border-[#D3D3D3] rounded-[10px] p-[12px] text-lg"
              >
                <img src={decrement} alt="-" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-[7px] mb-10 text-[18px] font-semibold tracking-wide">
          <button
            onClick={resetFilters}
            className="w-full border border-[#2563EB] rounded-[10px] h-[55px] text-[#2563EB]"
          >
            Reset filter
          </button>
          <button
            onClick={handleApply}
            className="w-full bg-[#2563EB] rounded-[10px] h-[55px] text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
