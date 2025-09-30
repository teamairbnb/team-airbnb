import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHead from "../components/OnboardingHead";

export default function CodeVerification() {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [errors, setErrors] = useState(Array(6).fill(false));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds)=> {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value && !/^[0-9]$/.test(value)) {
      setErrors((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    } else {
      setErrors((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });

      if (value && index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(300); 
  };

  return (
    <>
      <OnboardingHead />
      <div className="flex flex-col min-h-screen mx-[15px] text-[#111827] overflow-hidden">
        <div>
          <p className="font-semibold text-[17px]">Verify</p>
          <p className="mt-[8px]">Check your mail for the verification code</p>
        </div>

        <div className="mt-[32px]">
          <p className="font-semibold">Input Code</p>

          <div className="flex w-full justify-between mt-[16px]">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                ref={(el) => (inputsRef.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`w-[51px] h-[54px] rounded-[15px] text-center text-lg focus:outline-none focus:ring-2 ${
                  errors[i]
                    ? "border-red-500 focus:ring-red-500"
                    : "border border-gray-300 focus:ring-indigo-500"
                }`}
              />
            ))}
          </div>

          <div className="flex font-semibold mt-[16px]">
            <p className="mr-auto text-[#6B7280]">
              Code is valid for{" "}
              <span className="text-[#111827]">{formatTime(timeLeft)}</span>
            </p>
            <p
              onClick={handleResend}
              className="text-[#2563EB] cursor-pointer"
            >
              Resend
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-[15px] pb-[57px] bg-white">
          <button onClick={() => navigate("/verificationsuccess")} className="bg-[#2563EB] w-full font-semibold tracking-wide flex justify-center items-center text-white rounded-[15px] py-[14px]">
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
