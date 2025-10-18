import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function BusinessInfo() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Business name validation
    if (!businessName) newErrors.businessName = "Business name is required";

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.phone = "Enter a valid phone number (10–15 digits)";
      }
    }

    // Address validation
    if (!address) newErrors.address = "Address is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ businessName, email, phone, address });
      alert("Business information submitted successfully!");

      // Reset form
      setBusinessName("");
      setEmail("");
      setPhone("");
      setAddress("");


    }
  };

  return (
    <div className="flex flex-col  justify-center w-full px-4">

      <Link to="/BusinessOwnerDashboard">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <div className="flex flex-col w-full max-w-[400px] mt-6">
        <div className="text-left mb-4">
          <h1 className="font-semibold text-xl">Business Information</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Business Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="businessName" className="block mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              placeholder="Johnny Rentals"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.businessName && (
              <p className="text-sm text-red-500 text-right">
                {errors.businessName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johnnyrentals@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.email && (
              <p className="text-sm text-red-500 text-right">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="block mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 text-right">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Business Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.address && (
              <p className="text-sm text-red-500 text-right">
                {errors.address}
              </p>
            )}
          </div>
 <button
            type="submit"
            className="mt-5 mb-16 bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-all"
          >
            Done
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default BusinessInfo;
