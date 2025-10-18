import React from "react";
import Header from "../components/Header.jsx";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-gray-50">
      {/* Header */}
      <Header title="Profile/Account Settings"/>

      
      <div className="flex flex-col w-full max-w-[400px] mt-8 px-4  bg-white rounded-2xl shadow-sm divide-y divide-gray-200">
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
