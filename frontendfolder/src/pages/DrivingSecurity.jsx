import React from 'react'
import { Link } from "react-router-dom";
import back from "../assets/back.svg";

export default function DrivingSecurity() {
  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        <Link
          to="/ReviewBooking"
          className="inline-flex items-center gap-2 text-gray-600 py-[10px] pl-[14px] pr-[6px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Driving security</p>
      </div>

      <Link
        to="/DrivingSecurity"
        className="block w-full my-4 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
      >
        Next
      </Link>
    </div>
  )
}
