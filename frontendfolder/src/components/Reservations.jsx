import React from "react";
import centeredmenu from "../assets/centeredmenu.svg";
import EachReservation from "./EachReservation";

export default function Reservations() {
  return (
    <div className="text-center text-[#111827] mt-10 relative tracking-wide">
      <p className="text-[20px] font-semibold">Reservations</p>

      <div className="flex mt-[46px] gap-3 items-center">
        <input type="text" placeholder="Search Car" className="w-full border border-[#D3D3D3] rounded-md p-[13px]" />
        <div className="py-[14px] px-6 border border-[#D3D3D3] rounded-md">
          <img src={centeredmenu} alt="" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <EachReservation />
        <EachReservation />
        <EachReservation />
      </div>
    </div>
  );
}
