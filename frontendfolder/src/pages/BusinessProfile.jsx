import React from "react";
import Header from "../components/Header.jsx";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

function BusinessProfile({ businessData }) {
  const navigate = useNavigate();

  const {
    businessName = "Johnny Rentals",
    email = "johnnyrentals@gmail.com",
    phone = "+1234567890",
    address = "Abuja",
  } = businessData || {};

  const handleEditClick = () => {
    navigate("/business-info");
  };

  return (
    <div className="flex flex-col justify-center w-full bg-gray-50">
      {/* Header */}
      <Header title="Profile/Business Information"  />

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        {/* Edit Icon */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleEditClick}
            className="p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Edit Business Info"
          >
            <Edit className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Info Fields */}
        <div className="flex flex-col gap-4 w-full">
          {/* Business Name */}
          <div className="flex flex-col gap-1 w-full">
            <label className="block mb-2">Business Name</label>
            <input
              type="text"
              value={businessName}
              readOnly
              className="border border-[#d1d1d1] bg-gray-100 text-[#717171] rounded-lg w-full p-3 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="border border-[#d1d1d1] bg-gray-100 text-[#717171] rounded-lg w-full p-3 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 w-full">
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              readOnly
              className="border border-[#d1d1d1] bg-gray-100 text-[#717171] rounded-lg w-full p-3 cursor-not-allowed"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 w-full">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              value={address}
              readOnly
              className="border border-[#d1d1d1] bg-gray-100 text-[#717171] rounded-lg w-full p-3 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
