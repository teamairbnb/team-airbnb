import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ChangePassword() {
  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative tracking-wide">
      <Link to="/Security">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <p className="font-semibold text-[22px]">Change Password</p>

      <div className="mt-[30px]">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="cardNumber" className="block font-medium mb-1">
            Current Password
          </label>
          <input
            type="text"
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 w-full my-5">
          <label htmlFor="cardNumber" className="block font-medium mb-1">
            New Password
          </label>
          <input
            type="text"
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="cardNumber" className="block font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="text"
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition">
          Save password
        </button>
      </div>
    </div>
  );
}
