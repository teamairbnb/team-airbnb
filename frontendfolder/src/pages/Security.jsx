import React, { useState } from "react";
import Header from "../components/Header.jsx";

function Security() {
  const [selectedOption, setSelectedOption] = useState("authenticator");

  const handleConfirm = () => {
    alert(`Security method saved: ${selectedOption === "authenticator" ? "Google Authenticator" : "Email Verification"}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
 
      <Header title="Profile/Security" />

      {/* Security Options */}
      <div className="w-full max-w-md mt-10 px-6 flex-grow">
        <div className="flex flex-col gap-6">
 
          <div className="bg-white rounded-lg shadow-sm px-4 py-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-800 font-medium">
                Mobile App Authenticator
              </span>
              <input
                type="radio"
                name="security"
                checked={selectedOption === "authenticator"}
                onChange={() => setSelectedOption("authenticator")}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            <p className="text-sm text-gray-500">
              Use Google Authenticator
            </p>
          </div>

          {/* Email Option */}
          <div className="bg-white rounded-lg shadow-sm px-4 py-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-800 font-medium">
                Email
              </span>
              <input
                type="radio"
                name="security"
                checked={selectedOption === "email"}
                onChange={() => setSelectedOption("email")}
                className="w-5 h-5 accent-blue-500"
              />
            </div>
            <p className="text-sm text-gray-500">
              Receive verification codes via email
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 pb-10 flex justify-center">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition w-full max-w-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Security;
