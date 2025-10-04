import React from "react";
import mercedes from "../assets/mercedes.svg";

export default function AvailableCarCard() {
  return (
    <div className="w-full rounded-[10px] bg-[white] mb-[20px] shadow-lg">
      <img className="w-full" src={mercedes} alt="" />
      <div className="m-[16px] tracking-wide">
        <p className="font-semibold text-[20px]">Mercedes Benz 480</p>
        <div className="text-[#6B7280] mt-[3px] flex font-semibold items-center gap-[4px] text-[12px]">
          <p>SUV</p>
          <p className="-mt-2">.</p>
          <p>Auto</p>
          <p className="-mt-2">.</p>
          <p>5 Seats</p>
        </div>

        <div className="h-[1px] bg-[#D3D3D3] mb-[15px] w-full mt-[32px] opacity-50"></div>

        <div className="flex items-center justify-between font-semibold">
          <p>
            $500 <span>/d</span>
          </p>
          <button className="bg-[#2563EB] tracking-wide flex justify-center items-center text-white rounded-[10px] py-[14px] px-[21px]">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
