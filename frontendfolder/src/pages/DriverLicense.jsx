import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import editicon from "../assets/darkediticon.svg";
import verifiedstatus from "../assets/verifiedstatus.svg";

export default function DriverLicense() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formData, setFormData] = useState({
    LicenseNum: "",
    MM: "",
    DD: "",
    YYYY: "",
  });

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative">
      <div className="flex justify-between my-6">
        <Link to="/UserProfile">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </Link>

        <img
          src={editicon}
          alt="edit"
          onClick={handleEditClick}
          className="cursor-pointer w-6 h-6"
        />
      </div>

      <div className="flex justify-between tracking-wide items-center">
        <p className="font-semibold text-[22px]">Driver License</p>
        <div className="flex items-center gap-1">
          <p className="text-[#B8B8B8] text-[12px]">Status:</p>
          <img src={verifiedstatus} className="h-5" alt="verified" />
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-8 tracking-wide space-y-6">
        <div className="px-[5px]">
          <p className="font-semibold">License Number</p>
          <input
            type="text"
            name="LicenseNum"
            value={formData.LicenseNum}
            disabled={!isEditing}
            onFocus={() => setActiveField("LicenseNum")}
            onBlur={() => setActiveField(null)}
            onChange={handleChange}
            className={`w-full border rounded-[8px] mt-3 py-[14px] px-[16px] outline-none transition
              ${
                activeField === "LicenseNum"
                  ? "border-[#2563EB]"
                  : "border-[#D3D3D3]"
              } 
              ${!isEditing ? "cursor-not-allowed bg-gray-50" : "bg-white"}
            `}
          />
        </div>

        <div className="px-[5px]">
          <p className="font-semibold">Expiry date</p>
          <div className="flex w-full gap-4 mt-3">
            {["MM", "DD", "YYYY"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={
                  field === "MM" ? "MM" : field === "DD" ? "DD" : "YYYY"
                }
                value={formData[field]}
                disabled={!isEditing}
                onFocus={() => setActiveField(field)}
                onBlur={() => setActiveField(null)}
                onChange={handleChange}
                className={`flex-1 w-full border rounded-[8px] py-[14px] px-[16px] outline-none transition
                  ${
                    activeField === field
                      ? "border-[#2563EB]"
                      : "border-[#D3D3D3]"
                  } 
                  ${!isEditing ? "cursor-not-allowed bg-gray-50" : "bg-white"}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
          <button
            onClick={() => {
              alert("Changes saved!");
              setIsEditing(false);
            }}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
