import React from "react";
import centeredmenu from "../assets/centeredmenu.svg";

export default function Reservations() {
  return (
    <div className="text-center text-[#111827] mt-10 relative">
      <p className="text-[20px] font-semibold">Reservations</p>

      <div className="flex mt-[46px] items-center">
        <input type="text" placeholder="Search Car" className="w-full border border-[#D3D3D3] rounded-[10px] p-[13px]" />
        <div className="py-[10] px-6">
          <img src={centeredmenu} alt="" />
        </div>
      </div>
    </div>
  );
}
