import React, { useState } from "react";
import menu from "../assets/darkhamburgermenu.svg";
import logo from "../assets/logowheel.svg";
import notificon from "../assets/blacknotificon.svg";
import userimg from "../assets/userimage.svg";
import logo_textblack from "../assets/logo_textblack.svg";
import chaticon from "../assets/blackchaticon.svg";

// Import your components
import Cars from "../components/Cars";
import RecentActivity from "../components/recentactivity";
import Reservations from "../components/Reservations";
// import Reports from "./Reports";
// import Profile from "./Profile";

export default function BusinessOwnerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // Render component based on menu selection
  const renderContent = () => {
    switch (activePage) {
      case "Cars":
        return <Cars />;
      case "Reservations":
        return <Reservations />;
      // case "Reports":
      //   return <Reports />;
      // case "Profile":
      //   return <Profile />;
      default:
        return (
          <div className="text-center text-[#111827] mt-10">
            <p className="text-lg font-semibold">Dashboard</p>
            <div className="mt-[32px] mb-4 font-semibold tracking-wide">
              <div className="flex gap-[16px] text-start">
                <div className="w-full px-[22px] py-[20px]  shadow-md rounded-[20px]">
                  <p className="text-[12px] text-[#6B7280] font-normal">
                    Total Cars
                  </p>
                  <p className="text-[24px] mt-5">30</p>
                </div>

                <div className="w-full px-[22px] py-[20px]  shadow-md rounded-[20px]">
                  <p className="text-[12px] text-[#6B7280] font-normal">
                    Active Bookings
                  </p>
                  <p className="text-[24px] mt-5">30</p>
                </div>
              </div>

              <div className="flex gap-[16px] text-start mt-[16px]">
                <div className="w-full px-[22px] py-[20px]  shadow-md rounded-[20px]">
                  <p className="text-[12px] text-[#6B7280] font-normal">
                    Revenue
                  </p>
                  <p className="text-[24px] mt-5">$12,450</p>
                </div>

                <div className="w-full px-[22px] py-[20px] shadow-md rounded-[20px]">
                  <p className="text-[12px] text-[#6B7280] font-normal">
                    Utilization Rate
                  </p>
                  <p className="text-[24px] mt-5">78%</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-start">
              <p className="text-[17px] font-semibold tracking-wide mb-6">
                Recent Activity
              </p>
              <div className="flex flex-col gap-5">
                <RecentActivity />
                <RecentActivity />
                <RecentActivity />
                <RecentActivity />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-[16px] py-[30px] relative">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sliding Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-[57px]">
          <button
            className="text-gray-500 mb-[36px] px-[35px] font-semibold"
            onClick={() => setSidebarOpen(false)}
          >
            <img className="w-16" src={logo_textblack} alt="Logo" />
          </button>
          <ul className="space-y-[8px] text-[#111827] font-semibold tracking-wide">
            {["Dashboard", "Cars", "Reservations", "Reports", "Profile"].map(
              (item) => (
                <li
                  key={item}
                  className={`cursor-pointer gap-[8px] p-[16px] flex ${
                    activePage === item
                      ? "bg-[#DEE8FC] text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActivePage(item);
                    setSidebarOpen(false);
                  }}
                >
                  <p>{item}</p>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <img
          onClick={() => setSidebarOpen(true)}
          className="w-7 cursor-pointer"
          src={menu}
          alt="menu"
        />
        <img className="w-8" src={logo} alt="logo" />
        <div className="flex gap-3">
          <img className="w-6" src={notificon} alt="notifications" />
          <img className="w-9" src={userimg} alt="user" />
        </div>

        <div className="fixed top-[440px] right-0 z-50 border border-[#D3D3D3] bg-white shadow-md w-[100px] translate-x-5 py-1 px-5 rounded-full flex justify-center items-center">
          <img className="w-9" src={chaticon} alt="Chat Icon" />
        </div>
      </div>

      {/* Dynamic Page Content */}
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}
