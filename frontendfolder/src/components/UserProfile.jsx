import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function UserProfile() {
  const menuItems = [
    { title: "Personal info" },
    { title: "Driver's license" },
    { title: "Saved Payment Methods" },
    { title: "Account Settings" },
    { title: "Notifications Preferences" },
    { title: "Security" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white">
        {/* Back Button */}
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-4 sm:px-6 flex flex-col items-center mb-6 sm:mb-8">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />

          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Rodie Jones
          </h2>

          <div className="text-gray-400 text-sm">@roro</div>
        </div>

        {/* Menu Items */}
        <div className="px-4 sm:px-6 space-y-2 sm:space-y-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full bg-white px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between rounded-xl border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-gray-900 text-sm sm:text-base font-normal">
                {item.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Log out Button */}
        <div className="px-4 sm:px-6 mt-6 sm:mt-8 pb-6 sm:pb-8">
          <button className="w-full text-red-500 text-sm sm:text-base font-medium hover:text-red-600 active:text-red-700 transition-colors py-2">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
