import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();

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
        <div className="px-4 py-6">
          <button
            onClick={() => navigate("/CustomerHomePage")}
            className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="px-4 flex flex-col items-center mb-6">
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
        <div className="px-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900 text-sm font-normal">
                {item.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Log out Button */}
        <div className="px-4 mt-6">
          <button className="w-full text-red-500 text-sm font-medium hover:text-red-600 transition-colors py-2">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
