import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function Slider({ currentStep = 6, totalSteps = 6}) {
  const navigate = useNavigate();
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between w-full max-w-[400px] px-4 mt-16 mb-2">
   
      <button
        type="button"
        onClick={() => navigate("/DrivingSecurity")}
        className="p-2  bg-[#D3D3D399] rounded"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>

     
      <div className="flex items-center justify-center gap-2 flex-1">
        {steps.map((step) => (
          <div
            key={step}
            className={`h-1.5 w-8 rounded-full transition-all duration-200 ${
              step === currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
