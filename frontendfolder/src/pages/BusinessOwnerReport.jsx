import React from "react";
import centeredmenu from "../assets/centeredmenu.svg";
import bookings from "../assets/bookingstats.svg";
import revenue from "../assets/revenuestats.svg";
import TopRentedCar from "../components/TopRentedCar";

export default function BusinessOwnerReport() {
  return (
    <div className="text-center text-[#111827] mt-10 relative tracking-wide">
      <p className="text-[20px] font-semibold">Reports</p>

      <div className="flex mt-[46px] gap-3 items-center">
        <input
          type="text"
          placeholder="Search Car"
          className="w-full border border-[#D3D3D3] rounded-md p-[13px]"
        />
        <div className="py-[14px] px-6 border border-[#D3D3D3] rounded-md">
          <img src={centeredmenu} alt="" />
        </div>
      </div>

      <div className="mt-10 text-start">
        <p className="text-[17px] font-semibold tracking-wide mb-4">Bookings</p>
        <img className="w-full" src={bookings} alt="" />
      </div>

      <div className="mt-10 text-start">
        <p className="text-[17px] font-semibold tracking-wide mb-4">
          Revenue breakdown
        </p>
        <img className="w-full" src={revenue} alt="" />
      </div>

      <div className="mt-10 text-start">
        <div className="flex justify-between font-semibold tracking-wide">
          <p className="text-[17px] mb-4">
            Top Rented Cars
          </p>

          <p>See all</p>
        </div>

        <div className="mt-5 grid gap-[16px] grid-cols-2">
            <TopRentedCar />
            <TopRentedCar />
            <TopRentedCar />
            <TopRentedCar />
        </div>
      </div>
    </div>
  );
}
