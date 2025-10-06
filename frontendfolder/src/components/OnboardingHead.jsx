import React from "react";
import logo from "../assets/logo.svg";
import headerbg from "../assets/headerbg.svg";

export default function OnboardingHead() {
  return (
    <div
      className="flex flex-col p-[25px] -translate-y-10 w-full rounded-[50px] h-[290px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${headerbg})` }}
    >
      <div className="relative flex flex-col items-center justify-end h-full">
        <img src={logo} className="w-[55px]" alt="" />
        <div className="text-white tracking-wide">
          <p className="font-semibold text-[31px] mt-[8px]">RENCAR</p>
          <p className="text-[12px] text-center">BUSINESS</p>
        </div>
      </div>
    </div>
  );
}
