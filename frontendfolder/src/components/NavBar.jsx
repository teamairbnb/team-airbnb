import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hamburgerIcon from "../assets/hamburgerIcon.svg";
import notifications from "../assets/notifications.svg";
import chatIcon from "../assets/chatIcon.svg";
import profileIcon from "../assets/profileIcon.svg";
import logo_textblack from "../assets/logo_textblack.svg";
import smblackcar from "../assets/smblackcar.svg";
import bookicon from "../assets/bookicon.svg";
import blackusericon from "../assets/blackusericon.svg";
import blackchaticon from "../assets/blackchaticon.svg";
import blacknotificon from "../assets/blacknotificon.svg";
import settingsicon from "../assets/settingsicon.svg";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { label: "Browse car", icon: smblackcar, path: "/CustomerHomePage" },
    { label: "Dashboard", icon: smblackcar, path: "/CustomerDashboard" },
    { label: "My Booking", icon: bookicon, path: "/MyBookings" },
    { label: "Profile", icon: blackusericon, path: "/UserProfile" },
    { label: "Chat", icon: blackchaticon, path: "/LiveChat" },
    { label: "Notification", icon: blacknotificon, path: "/Notifications" },
    { label: "Settings", icon: settingsicon, path: "/Settings" },
  ];

  return (
    <>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-[57px]">
          {/* Logo */}
          <button
            className="text-gray-500 mb-[36px] px-[35px] font-semibold"
            onClick={() => setSidebarOpen(false)}
          >
            <img className="w-16" src={logo_textblack} alt="Logo" />
          </button>

          {/* Sidebar Menu */}
          <ul className="space-y-[8px] text-[#111827] font-semibold tracking-wide">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSidebarOpen(false);

                    if (item.path === "/LiveChat") {
                      navigate(item.path, {
                        state: {
                          backTo: "/UserProfile",
                          role: "Customer",
                        },
                      });
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`cursor-pointer gap-[8px] p-[16px] flex transition-all duration-200 ${
                    isActive
                      ? "bg-[#DEE8FC] text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  <img className="w-[22px]" src={item.icon} alt="" />
                  <p>{item.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Top NavBar */}
      <div className="flex items-center justify-between w-full px-4 py-3 bg-white relative z-30">
        {/* Hamburger Icon */}
        <div className="flex items-center">
          <img
            src={hamburgerIcon}
            alt="Menu"
            className="h-6 w-6 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <img
            src={chatIcon}
            alt="Chat"
            className="h-6 w-6 cursor-pointer"
            onClick={() =>
              navigate("/LiveChat", {
                state: {
                  backTo: "/UserProfile",
                  role: "Customer",
                },
              })
            }
          />
          <img
            src={profileIcon}
            alt="Profile"
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate("/UserProfile")}
          />
          <img
            src={notifications}
            alt="Notifications"
            className="h-6 w-6 cursor-pointer"
            onClick={() => navigate("/Notifications")}
          />
        </div>
      </div>
    </>
  );
}

export default NavBar;
