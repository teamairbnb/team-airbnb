import React from "react";
import mercedes from "../assets/mercedes.svg";
import editicon from "../assets/editicon.svg";
import benzlogo from "../assets/benzlogo.svg";
import deleteicon from "../assets/delete.svg";

export default function OwnerCar() {
  return (
    <div className="flex flex-col text-[#111827]">
      <div className="bg-[#2563EB] relative px-4 py-1 w-32 flex items-center gap-3 text-white rounded-t-xl rounded-br-xl translate-y-4">
        <div className="bg-[#16A34A] h-3 w-3 rounded-full"></div>
        <p className="text-[17px]">Available</p>
      </div>
      <img className="" src={mercedes} alt="" />
      {/* <img
        className="w-5 translate-x-[300px] -translate-y-[150px]"
        src={editicon}
        alt=""
      /> */}
      <div className="w-full border shadow-lg rounded-b-xl px-4 pt-[18px] pb-5">
        <div className="flex justify-between">
          <div className="flex gap-[14px]">
            <img className="w-7" src={benzlogo} alt="" />
            <div className="text-xs text-start tracking-wide">
              <p className="text-[18px] font-semibold">Mercedes Benz 480</p>
              <p className="my-2 text-[#6B7280]">Model Year - 2021</p>
              <p className="text-[#6B7280]">SUV</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-7">
            <img className="w-4 -translate-y-5" src={deleteicon} alt="" />
            <img className="w-4 -translate-y-5" src={editicon} alt="" />
          </div>
        </div>

        <div className="mt-4 text-[12px] flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Body Type</p>
            <p>SUV</p>
          </div>

          <div className="flex justify-between">
            <p>Engine</p>
            <p>SUV</p>
          </div>

          <div className="flex justify-between">
            <p>Transmission</p>
            <p>SUV</p>
          </div>

          <div className="flex justify-between">
            <p>Seat</p>
            <p>SUV</p>
          </div>
        </div>

        <p className="font-semibold text-start mt-4">
          $500 <span className="text-[#6B7280]">/d</span>
        </p>
      </div>
    </div>
  );
}
