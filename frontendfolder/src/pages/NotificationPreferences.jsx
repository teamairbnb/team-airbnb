import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

function NotificationPreferences() {
  const [emailPref, setEmailPref] = useState(true);
  const [smsPref, setSmsPref] = useState(false);

  const handleConfirm = () => {
    alert(`Preferences saved:
    • Email: ${emailPref ? "Enabled" : "Disabled"}
    • SMS: ${smsPref ? "Enabled" : "Disabled"}`);
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen relative px-4">
      <div className="relative flex items-center justify-center my-6">
        <Link to="/BusinessOwnerDashboard" className="absolute left-0">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </Link>

        <p className="font-semibold text-[#11182773]">
          Profile / <span className="text-[#111827]">Notifications</span>
        </p>
      </div>

      {/* Preferences Container */}
      <div className="flex flex-col w-full max-w-[400px] mt-8 px-4 bg-white rounded-2xl shadow-sm divide-y divide-gray-200 mx-auto">
        {/* Email Preferences */}
        <div className="flex items-center justify-between py-5">
          <span className="text-gray-800 font-medium text-[16px]">
            Email Preferences
          </span>
          <button
            onClick={() => setEmailPref(!emailPref)}
            aria-label="Toggle email notifications"
            className={`w-12 h-7 flex items-center rounded-full p-[2px] transition-colors duration-300 ${
              emailPref ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                emailPref ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* SMS Alerts */}
        <div className="flex flex-col py-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-800 font-medium text-[16px]">
              SMS Alerts
            </span>
            <button
              onClick={() => setSmsPref(!smsPref)}
              aria-label="Toggle SMS alerts"
              className={`w-12 h-7 flex items-center rounded-full p-[2px] transition-colors duration-300 ${
                smsPref ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  smsPref ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500 ml-1">
            I want to receive SMS alerts
          </p>
        </div>
      </div>

      {/* Confirm Button (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
        <Button
          text="Confirm"
          type="button"
          onClick={handleConfirm}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default NotificationPreferences;
