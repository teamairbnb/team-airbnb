import React, { useState } from "react";
import OwnerRead from "../components/OwnerRead";
import OwnerUnread from "../components/OwnerUnread";
import OwnerAll from "../components/OwnerAll";

export default function BusinessNotification() {
  const [activeTab, setActiveTab] = useState("All");

  const renderContent = () => {
    switch (activeTab) {
      case "Unread":
        return <OwnerUnread />;
      case "Read":
        return <OwnerRead />;
      default:
        return (
          <>
            <OwnerAll />
          </>
        );
    }
  };

  const tabs = ["All", "Unread", "Read"];

  return (
    <div className="text-center text-[#111827] mt-10 relative tracking-wide">
      <p className="text-[20px] font-semibold">Notification</p>

      <div className="flex justify-center gap-4 mt-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-1 rounded-full font-medium transition-colors ${
              activeTab === tab
                ? "bg-[#2563EB] text-white"
                : "bg-[#E5E7EB] text-[#6B7280] hover:bg-[#D1D5DB]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}
