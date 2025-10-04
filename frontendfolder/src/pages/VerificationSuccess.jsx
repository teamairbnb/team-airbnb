import React from "react";
import { useNavigate } from "react-router-dom";
import successtick from "../assets/successtick.svg";
import OnboardingHead from "../components/OnboardingHead";

export default function VerificationSuccess() {
  const navigate = useNavigate();
  return (
    <>
      <OnboardingHead />
      <div className="flex justify-center min-h-screen mx-[15px] mt-[156px] text-[#111827] overflow-hidden">
        <div className="flex flex-col items-center">
          <img className="w-[55px]" src={successtick} alt="" />
          <p className="font-semibold mt-[16px] text-[17px] text-[#111827]">
            Verified
          </p>
        </div>
        <div className="fixed bottom-0 left-0 w-full px-[15px] pb-[57px] bg-white">
          <button onClick={() => navigate("/CustomerHomePage")} className="bg-[#2563EB] w-full font-semibold tracking-wide flex justify-center items-center text-white rounded-[15px] py-[14px]">
            Done
          </button>
        </div>
      </div>
    </>
  );
}
