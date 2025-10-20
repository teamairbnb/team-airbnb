import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import editicon from "../assets/darkediticon.svg";

export default function CustomerPersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  });

  // ✅ Load user_info from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_info"));
    if (storedUser) {
      setFormData({
        firstName: storedUser.first_name || "",
        lastName: storedUser.last_name || "",
        username: storedUser.username || "",
        email: storedUser.email || "",
        phone: storedUser.phone_number || "",
      });
    }
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedInfo = {
      username: formData.username,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone_number: formData.phone,
    };
    localStorage.setItem("user_info", JSON.stringify(updatedInfo));
    alert("Changes saved!");
    setIsEditing(false);
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative">
      <Link to="/UserProfile">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <div className="flex justify-between tracking-wide items-center">
        <p className="font-semibold text-[22px]">Personal Information</p>
        <img
          src={editicon}
          alt="edit"
          onClick={handleEditClick}
          className="cursor-pointer w-6 h-6"
        />
      </div>

      {/* Form Fields */}
      <div className="mt-8 tracking-wide space-y-6">
        {[
          {
            label: "First name",
            hint: "(as it appears on driver's license)",
            name: "firstName",
          },
          {
            label: "Last name",
            hint: "(as it appears on driver's license)",
            name: "lastName",
          },
          { label: "Username", name: "username" },
          { label: "Email", name: "email" },
          { label: "Phone Number", name: "phone" },
        ].map((field, index) => (
          <div key={index} className="px-[5px]">
            <p className="font-semibold">
              {field.label}{" "}
              {field.hint && (
                <span className="text-[#6B7280] text-[14px] font-normal">
                  {field.hint}
                </span>
              )}
            </p>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              disabled={!isEditing}
              onFocus={() => setActiveField(field.name)}
              onBlur={() => setActiveField(null)}
              onChange={handleChange}
              className={`w-full border rounded-[8px] mt-3 py-[14px] px-[16px] outline-none transition
                ${
                  activeField === field.name
                    ? "border-[#2563EB]"
                    : "border-[#D3D3D3]"
                } 
                ${!isEditing ? "cursor-not-allowed" : "bg-white"}
              `}
            />
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
