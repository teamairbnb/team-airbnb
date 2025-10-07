import React from "react";
import greencheck from "../assets/greencheck.svg";

export default function DrivingSecurityCard({ title, description, img, features = [], price }) {
  // Conditional styles
  const isNoFeatures = features.length === 0;

  return (
    <div
      className={`border py-[24px] px-2 rounded-[10px] ${
        isNoFeatures ? "border-gray-400 bg-gray-50" : "border-[#D3D3D3]"
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-[8px]">
          <input type="radio" name="optionPreference" className="w-5 h-5" />
          <p
            className={`font-semibold -mt-[1px] tracking-normal ${
              isNoFeatures ? "text-gray-700" : ""
            }`}
          >
            {title}
          </p>
        </div>
        <img className="w-10" src={img} alt="" />
      </div>

      <div className="bg-[#D3D3D3] opacity-40 w-full h-[1px] mt-2"></div>

      <p
        className={`mt-[8px] text-[12px] ${
          isNoFeatures ? "text-gray-500" : "text-[#16A34A]"
        }`}
      >
        {description}
      </p>

      {features.length > 0 && (
        <div className="mt-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex gap-[8px] ${
                index !== features.length - 1 ? "my-[8px]" : "mt-[8px]"
              }`}
            >
              <img src={greencheck} alt="" />
              <p className="text-[12px]">{feature}</p>
            </div>
          ))}

          {price && (
            <div className="flex justify-between mt-[16px]">
              <div></div>
              <p className="font-semibold">
                ${price} / <span className="text-[#6B7280]">day</span>
              </p>
            </div>
          )}
        </div>
      )}

      {isNoFeatures && price && (
        <div className="flex justify-end mt-[16px]">
          <p className="font-semibold">
            ${price} / <span className="text-[#6B7280]">day</span>
          </p>
        </div>
      )}
    </div>
  );
}
