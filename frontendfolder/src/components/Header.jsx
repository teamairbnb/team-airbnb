import React from "react";
import { Menu, Bell } from "lucide-react";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.svg";

function Header({title}) {
  return (
    <header className="flex items-center justify-between px-3 py-4 bg-white shadow-sm">
      
      <div className="p-2">
        <Menu className="w-7 h-7 text-gray-700" />
      </div>

      
      <div className="flex flex-col items-center text-center">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 object-contain mt-9"
        />
        <div>
          <h1 className="text-base font-semibold text-gray-800 mt-6">
            {title}
          </h1>
         
        </div>
      </div>

      
      <div className="flex items-center gap-3">
        <div>
          <Bell className="w-4 h-4 text-gray-700" />
        </div>
        <div>
          <img
            src={profile}
            alt="User profile"
            className="w-9 h-9 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
