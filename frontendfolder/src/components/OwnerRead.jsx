import React from "react";
import bluetick from "../assets/bluetick.svg";
import conflict from "../assets/conflict.svg";
import payment from "../assets/payment.svg";

export default function OwnerRead() {
  return (
    <>
      <div className="space-y-3">
        <div className="bg-[#EFEFEF] py-2 px-4 text-start text-sm rounded-2xl">
          <div className="flex gap-3 text-[#717171] items-center">
            <img src={bluetick} alt="" />
            <p className="text-[12px]">2h ago</p>
          </div>

          <p className="text-[#6B7280] my-[10px]">
            New Reservation – John booked Toyota Camry (3 days)
          </p>

          <div className="flex justify-end">
            <p className="underline text-[#2563EB] cursor-pointer">View</p>
          </div>
        </div>

        <div className="bg-[#EFEFEF] py-2 px-4 text-start text-sm rounded-2xl">
          <div className="flex gap-3 text-[#717171] items-center">
            <img src={conflict} alt="" />
            <p className="text-[12px]">2h ago</p>
          </div>

          <p className="text-[#6B7280] my-[10px]">
            New Reservation – John booked Toyota Camry (3 days)
          </p>

          <div className="flex justify-end">
            <p className="underline text-[#2563EB] cursor-pointer">View</p>
          </div>
        </div>

        <div className="bg-[#EFEFEF] py-2 px-4 text-start text-sm rounded-2xl">
          <div className="flex gap-3 text-[#717171] items-center">
            <img src={payment} alt="" />
            <p className="text-[12px]">2h ago</p>
          </div>

          <p className="text-[#6B7280] my-[10px]">
            New Reservation – John booked Toyota Camry (3 days)
          </p>

          <div className="flex justify-end">
            <p className="underline text-[#2563EB] cursor-pointer">View</p>
          </div>
        </div>
      </div>
    </>
  );
}
