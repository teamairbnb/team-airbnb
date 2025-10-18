import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Security() {
  const navigate = useNavigate();
  const location = useLocation();
  const backTo = location.state?.backTo || "/";

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const savedSetting = localStorage.getItem("twoFactorAuth");
    if (savedSetting !== null) {
      setIsEnabled(savedSetting === "true");
    }
  }, []);

  const handleSavedChanges = () => {
    localStorage.setItem("twoFactorAuth", isEnabled);
    alert("Changes saved successfully!");
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative tracking-wide">
        <button onClick={() => navigate(backTo)} className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

      <p className="font-semibold text-[22px]">Security</p>

      <div className="mt-[30px]">
        <div onClick={() => navigate("/ChangePassword")} className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl border border-[#D3D3D3] hover:bg-gray-50">
          <p>Change password</p>
        </div>

        <div className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl mt-4 border border-[#D3D3D3] hover:bg-gray-50">
          <p>Two-Factor Authentication</p>

          <button
            onClick={() => setIsEnabled(!isEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-[2px] transition-colors duration-300 ${
              isEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                isEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => navigate("/CustomerPersonalInfo")}
          className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl mt-4 border border-[#D3D3D3] hover:bg-gray-50"
        >
          <span className="text-gray-900">Personal info</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSavedChanges}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
