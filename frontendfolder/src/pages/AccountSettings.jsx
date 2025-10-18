import React from "react";
import Header from "../components/Header.jsx";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-gray-50 px-4">

      <div className="relative flex items-center justify-center my-6">
        <Link to="/BusinessOwnerDashboard" className="absolute left-0">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </Link>

        <p className="font-semibold text-[#11182773]">
          Profile / <span className="text-[#111827]">Account Settings</span>
        </p>
      </div>

      <div className="flex gap-5 flex-col w-full max-w-[400px] mt-8 px-4  bg-white rounded-2xl shadow-sm divide-y divide-gray-200">
        {/* Change Email */}
        <div
          onClick={() => navigate("/ChangeEmail")}
          className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <span className="text-gray-800 font-medium">Change Email</span>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>

        {/* Change Phone Number */}
        <div
          onClick={() => navigate("/ChangePhone")}
          className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <span className="text-gray-800 font-medium">Change Phone Number</span>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>

        {/* Change Password */}
        <div
          onClick={() => navigate("/BusinessOwnerChangePassword")}
          className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition"
        >
          <span className="text-gray-800 font-medium">Change Password</span>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
