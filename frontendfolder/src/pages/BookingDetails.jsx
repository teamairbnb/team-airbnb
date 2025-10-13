import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menu from "../assets/darkhamburgermenu.svg";
import chaticon from "../assets/darkchat.svg";
import blackusericon from "../assets/blackusericon.svg";
import blacknotificon from "../assets/blacknotificon.svg";
import selectedcarimg from "../assets/smselectedcar.svg";
import confirmedstatus from "../assets/confirmedstatus.svg";
import cancelbookingwarning from "../assets/cancelbookingwarning.svg";
import close from "../assets/close.svg";
import { useCarContext } from "../components/FetchCarDetails";

export default function BookingDetails() {
  const [showModal, setShowModal] = useState(false);
  const { car, bookingDetails } = useCarContext();
  const navigate = useNavigate();

  const handleCancelClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const selectedPlanPrice =
    parseFloat(localStorage.getItem("selectedPlanPrice")) || 0;
  const carPrice = car ? parseFloat(car.price) : 0;
  const totalPrice = carPrice + selectedPlanPrice;

  const handleConfirmBooking = () => {
    alert("🎉 Thank you! Your booking has been confirmed successfully.");
    localStorage.removeItem("bookingDetails");
    navigate("/CustomerHomePage");
  };

  function formatTimeTo12Hour(time) {
    if (!time) return "--:--";
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const formattedHour = ((h + 11) % 12) + 1; 
    return `${formattedHour}:${minute} ${suffix}`;
  }

  return (
    <div className="text-[#111827] px-[16px] pb-[43px] relative">
      {/* Header */}
      <div className="flex relative justify-between py-[16px]">
        <div className="flex right-0 absolute gap-[16px]">
          <img className="w-6" src={chaticon} alt="Chat" />
          <img className="w-6" src={blackusericon} alt="User" />
          <img className="w-6" src={blacknotificon} alt="Notifications" />
        </div>
      </div>

      <p className="font-bold text-[25px] mt-12">Booking details</p>

      {/* Car Info */}
      <div className="mt-[16px] py-[32px] px-[16px] flex items-center">
        <img
          className="w-[90px]"
          src={car?.image || selectedcarimg}
          alt={car?.name}
        />
        <div className="ml-[17px]">
          <p className="font-semibold">{car?.name || "Car name unavailable"}</p>
          <p className="text-[12px] mt-[8px] tracking-wide">
            {bookingDetails?.pickUpDate || "Start date"} -
            {bookingDetails?.returnDate || "End date"}
          </p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p>
          Booking ID :
          <span className="text-[#6B7280] ml-[16px] font-normal">
            #RNT - {bookingDetails?.bookingId || "1024"}
          </span>
        </p>
        <div className="flex gap-[16px] mt-[8px]">
          <p>Status : </p>
          <img
            className="w-20 mt-[2px]"
            src={confirmedstatus}
            alt="Confirmed"
          />
        </div>
      </div>

      {/* Pick-up Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Pick-up</p>
        <div className="mt-[19px]">
          <p>
            Location :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.pickUpLocation || "company address"}
            </span>
          </p>
          <p>
            Date :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.pickUpDate || "--/--/----"}
            </span>
          </p>
          <p>
            Time :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {formatTimeTo12Hour(bookingDetails?.pickUpTime)}
            </span>
          </p>
        </div>
      </div>

      {/* Drop-off Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Drop-off</p>
        <div className="mt-[19px]">
          <p>
            Location :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.dropOffLocation || "company address"}
            </span>
          </p>
          <p>
            Date :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.returnDate || "--/--/----"}
            </span>
          </p>
          <p>
            Time :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {formatTimeTo12Hour(bookingDetails?.returnTime)}
            </span>
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Payment</p>
        <div className="mt-[19px]">
          <p>
            Daily Rate :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              ${carPrice.toFixed(2)}
            </span>
          </p>
          <p>
            Insurance :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              ${selectedPlanPrice.toFixed(2)}
            </span>
          </p>
          <p>
            Total :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      {/* Driver Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Driver Info</p>
        <div className="mt-[19px]">
          <p>
            Name :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.driverName || "Roro Jones"}
            </span>
          </p>
          <p>
            Phone :
            <span className="text-[#6B7280] ml-[16px] font-normal">
              {bookingDetails?.driverPhone || "+234 8044444444"}
            </span>
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex mt-[24px] gap-[11px]">
        <button
          onClick={handleCancelClick}
          className="w-full border border-[#D3D3D3] rounded-[10px] py-4 text-[14px]"
        >
          Cancel booking
        </button>
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-[#2563EB] rounded-[10px] py-4 text-white text-[14px]"
        >
          Confirm
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[92%] max-w-[400px] p-6 text-center">
              <div className="flex justify-between">
                <div></div>
                <img
                  onClick={handleCloseModal}
                  className="w-[24px] mb-2 cursor-pointer"
                  src={close}
                  alt="Close"
                />
              </div>
              <h2 className="font-bold text-[25px] mb-3">Cancel Booking</h2>
              <p className="text-[#6B7280] text-sm mb-6">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>

              <div className="flex justify-center mb-6">
                <img src={cancelbookingwarning} alt="Warning" />
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleCloseModal();
                    alert("Booking cancelled successfully.");
                  }}
                  className="w-full py-4 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Yes, cancel booking
                </button>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-4 border border-[#D3D3D3] rounded-lg text-sm"
                >
                  No, keep booking
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
