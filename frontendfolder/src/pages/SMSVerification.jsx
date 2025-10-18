import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";

function SMSVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`sms-code-${index + 1}`).focus();
      }
    }
  };

  const handleConfirm = () => {
    alert(`SMS verification code entered: ${code.join("")}`);
  };

  const handleResend = () => {
    setCode(["", "", "", "", "", ""]);
    setTimeLeft(60);
    alert("A new SMS code has been sent to your phone.");
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Header title="Profile/Account Settings" />

      <div className="flex flex-col mt-10 px-6 w-full max-w-md mx-auto flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-left">
          Verify
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-left">
          SMS OTP verification code.
        </p>

        <h3 className="text-base font-medium text-gray-700 mb-3 text-left">
          Input Code
        </h3>

        
        <div className="flex justify-start gap-3 mb-6 max-w-[360px]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`sms-code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg border border-gray-400 rounded-md focus:border-blue-500 outline-none"
            />
          ))}
        </div>

        
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">
            Code is valid for{" "}
            <span className="text-blue-500 font-medium">
              {formatTime(timeLeft)}
            </span>
          </p>

          {timeLeft === 0 && (
            <button
              onClick={handleResend}
              className="text-black text-sm hover:underline"
            >
              Resend Code
            </button>
          )}
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

export default SMSVerification;
