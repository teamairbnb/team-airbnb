import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import selectedcarimg from "../assets/smselectedcar.svg";
import EditField from "../components/EditField";
import { useCarContext } from "../components/FetchCarDetails";

export default function ReviewBooking() {
  const { car, bookingDetails } = useCarContext();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user_info"));
    if (storedUser) {
      setUserInfo({
        fullName: `${storedUser.first_name || ""} ${storedUser.last_name || ""}`.trim(),
        email: storedUser.email || "",
        phone: storedUser.phone_number || "",
      });
    }
  }, []);

  // Format to 12-hour time with AM/PM
  const formatTo12Hour = (time) => {
    if (!time) return "";
    const [hourStr, minute] = time.split(":");
    const hour = parseInt(hourStr, 10);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = ((hour % 12) || 12).toString().padStart(2, "0");
    return `${formattedHour}:${minute} ${period}`;
  };

  // Format "yyyy-mm-dd" → "dd Mon yyyy"
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formattedPickUpDate = formatDate(bookingDetails.pickUpDate);
  const formattedReturnDate = formatDate(bookingDetails.returnDate);
  const formattedPickUpTime = formatTo12Hour(bookingDetails.pickUpTime);
  const formattedReturnTime = formatTo12Hour(bookingDetails.returnTime);

  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        {/* Back button */}
        <Link
          to={`/book/${car.id}/PickUp`}
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Review your booking</p>

        {/* Selected Car */}
        <div className="mt-[13px] py-[32px] flex items-center">
          <img
            className="w-[90px]"
            src={car.image || selectedcarimg}
            alt={car.name}
          />
          <div className="ml-[16px]">
            <p className="text-[17px] font-semibold capitalize">{car.name}</p>
            <p className="text-[#6B7280] text-[12px] mt-1 mb-2 font-semibold tracking-normal">
              or similar model
            </p>
            <p className="text-[12px] text-[#6B7280] font-semibold tracking-normal">
              Rental duration{" "}
              <span className="text-[#111827] text-[13px]">
                {bookingDetails.pickUpDate && bookingDetails.returnDate
                  ? `${formattedPickUpDate} - ${formattedReturnDate}`
                  : "Not selected"}
              </span>
            </p>
          </div>
        </div>

        {/* Driver Info Section */}
        <div className="mt-[40px]">
          <p className="font-bold mb-6">Driver Info</p>
          <EditField title="Full name" value={userInfo.fullName || ""} />
          <EditField title="Email address" value={userInfo.email || ""} />
          <EditField title="Phone number" value={userInfo.phone || ""} />

          {/* Pickup & Dropoff */}
          <div className="mt-[45px]">
            <EditField title="Pick-up address" value={"company address"} />
            <EditField title="Drop-off address" value={"company address"} />

            <div className="flex gap-[12px] mt-2">
              <EditField title="Pick-up date" value={formattedPickUpDate || ""} />
              <EditField title="Pick-up time" value={formattedPickUpTime || ""} />
            </div>

            <div className="flex gap-[12px] mt-1">
              <EditField title="Drop-off date" value={formattedReturnDate || ""} />
              <EditField title="Drop-off time" value={formattedReturnTime || ""} />
            </div>
          </div>
        </div>

        {/* Text Preference Section */}
        <div className="my-[48px]">
          <div className="flex items-center gap-[8px]">
            <input
              type="radio"
              name="textMessagePreference"
              className="w-5 h-5 accent-[#2563EB]"
            />
            <div className="text-[12px]">
              <p>Yes, I want to receive text messages about my rental.</p>
              <p className="underline">
                For more information, please review our privacy policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[8px] mt-4">
            <input
              type="radio"
              name="textMessagePreference"
              className="w-5 h-5 accent-[#2563EB]"
            />
            <div className="text-[12px]">
              <p>No, I don't want to receive any text messages</p>
            </div>
          </div>
        </div>
      </div>

      <Link
        to={`/book/${car.id}/DrivingSecurity`}
        className="block w-full my-4 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
      >
        Next
      </Link>
    </div>
  );
}
