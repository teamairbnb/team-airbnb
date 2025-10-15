import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import { ToggleLeft, ToggleRight } from "lucide-react";

function NotificationPreferences() {
  const [emailPref, setEmailPref] = useState(true);
  const [smsPref, setSmsPref] = useState(false);

  const handleConfirm = () => {
    alert(`Preferences saved:
    • Email: ${emailPref ? "Enabled" : "Disabled"}
    • SMS: ${smsPref ? "Enabled" : "Disabled"}`);
  };

  return (
    <div className="flex flex-col  w-full  bg-gray-50 relative">

      <Header title="Profile/Notifications" />

 
      <div className="flex flex-col w-full max-w-[400px] mt-8 px-4 bg-white rounded-2xl shadow-sm divide-y divide-gray-200">
        {/* Email Preferences */}
        <div className="flex items-center justify-between py-5">
          <span className="text-gray-800 font-medium text-[16px]">
            Email Preferences
          </span>
          <button onClick={() => setEmailPref(!emailPref)}>
            {emailPref ? (
              <ToggleRight className="w-10 h-10 text-blue-500" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-gray-400" />
            )}
          </button>
        </div>

        {/* SMS Alerts */}
        <div className="flex flex-col py-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-800 font-medium text-[16px]">
              SMS Alerts
            </span>
            <button onClick={() => setSmsPref(!smsPref)}>
              {smsPref ? (
                <ToggleRight className="w-10 h-10 text-blue-500" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-gray-400" />
              )}
            </button>
          </div>

          <p className="text-sm text-gray-500 ml-1">
            I want to receive SMS alerts
          </p>
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
        <Button
          text="Confirm"
          type="button"
          onClick={handleConfirm}
          className="w-full "
        />
      </div>
    </div>
  );
}

export default NotificationPreferences;
