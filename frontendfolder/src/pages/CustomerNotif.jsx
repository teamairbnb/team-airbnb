import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

export default function CustomerNotif() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  useEffect(() => {
    const savedPush = localStorage.getItem("pushNotifications");
    const savedReminder = localStorage.getItem("bookingReminders");

    if (savedPush !== null) setPushEnabled(savedPush === "true");
    if (savedReminder !== null) setReminderEnabled(savedReminder === "true");
  }, []);

  const handleSavedChanges = () => {
    localStorage.setItem("pushNotifications", pushEnabled);
    localStorage.setItem("bookingReminders", reminderEnabled);
    alert("Notification preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative tracking-wide">

      <div className="w-full bg-white">
        <div className="pt-4 pb-10">
          <NavBar />
        </div>
      </div>

      <div className="mx-4 pb-24">
        <p className="font-semibold text-[22px] mb-10">
          Notification Preferences
        </p>

        {/* Push Notifications */}
        <div className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl mt-4 border border-[#D3D3D3] hover:bg-gray-50">
          <p>Push Notifications</p>

          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-[2px] transition-colors duration-300 ${
              pushEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                pushEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Booking Reminders */}
        <div className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl mt-5 border border-[#D3D3D3] hover:bg-gray-50">
          <p>Booking Reminders</p>

          <button
            onClick={() => setReminderEnabled(!reminderEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-[2px] transition-colors duration-300 ${
              reminderEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                reminderEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Button */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSavedChanges}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
