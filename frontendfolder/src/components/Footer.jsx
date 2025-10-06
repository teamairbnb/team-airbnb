import React from "react";
import logotext from "../assets/whitelogotext.svg";

export default function Footer() {
  return (
    <div className="bg-[#2563EB] mt-[20px] p-[50px] flex justify-between">
      <div>
        <img className="w-[64px]" src={logotext} alt="" />
        <div className="mt-[24px]">
          <p className="font-semibold text-white">Legal</p>
          <div className="text-[12px] text-[#F9FAFB80] mt-2">
            <p>Terms</p>
            <p className="mt-1">Privacy</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <p className="font-semibold text-white">Services</p>
          <div className="text-[12px] text-[#F9FAFB80] mt-2">
            <p>Browse Cars</p>
            <p className="my-1">My Booking</p>
            <p>Profile</p>
          </div>
        </div>

        <div className="mt-[24px]">
          <p className="font-semibold text-white">Support</p>
          <div className="text-[12px] text-[#F9FAFB80] mt-2">
            <p>Help Center</p>
            <p className="mt-1">Contact Us</p>
          </div>
        </div>
      </div>
    </div>
  );
}
