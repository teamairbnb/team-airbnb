import React from "react";

export default function SavedCard({ cardNum, img, tempSelection, setTempSelection, value }) {
  return (
    <div
      className={`w-full mt-6 border rounded-[10px] flex items-center justify-between py-[21px] px-4 transition ${
        tempSelection === value ? "border-[#2563EB]" : "border-[#D3D3D3]"
      }`}
    >
      <div className="flex items-center">
        <img className="w-8 mt-[6px]" src={img} alt={value} />
        <p className="ml-2 font-semibold">{cardNum}</p>
      </div>

      <input
        type="radio"
        name="selectedCard"
        value={value}
        checked={tempSelection === value}
        onChange={() => setTempSelection(value)}
        className="w-5 h-5 accent-[#2563EB] cursor-pointer"
      />
    </div>
  );
}
