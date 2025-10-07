import React, { useState, useEffect } from "react";
import editicon from "../assets/editicon.svg";

export default function EditField({ title, value: initialValue = "" }) {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Update field if prop changes (important when data comes from route)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="mt-[15px] relative">
      <p>{title}</p>
      <div className="relative mt-[8px]">
        <input
          type="text"
          className={`w-full border border-[#D3D3D3] px-[16px] py-[14px] rounded-[10px] pr-[40px] focus:outline-none focus:border-[#2563EB] transition-colors duration-200 ${
            !isEditable ? "cursor-not-allowed" : ""
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!isEditable}
        />
        <img
          src={editicon}
          alt="Edit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setIsEditable(true)}
        />
      </div>
    </div>
  );
}
