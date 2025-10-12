import React, { useState } from "react";
import menu from "../assets/darkhamburgermenu.svg";
import chaticon from "../assets/darkchat.svg";
import blackusericon from "../assets/blackusericon.svg";
import blacknotificon from "../assets/blacknotificon.svg";
import selectedcarimg from "../assets/smselectedcar.svg";
import confirmedstatus from "../assets/confirmedstatus.svg";
import cancelbookingwarning from "../assets/cancelbookingwarning.svg";
import close from "../assets/close.svg";

export default function BookingDetails() {
  const [showModal, setShowModal] = useState(false);

  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-[#111827] px-[16px] pb-[43px] relative">
      {/* Header */}
      <div className="flex justify-between py-[16px]">
        <img src={menu} alt="" />
        <div className="flex gap-[16px]">
          <img className="w-6" src={chaticon} alt="" />
          <img className="w-6" src={blackusericon} alt="" />
          <img className="w-6" src={blacknotificon} alt="" />
        </div>
      </div>
      
      <p className="font-bold text-[25px] mt-[20px]">Booking details</p>

      {/* Car Info */}
      <div className="mt-[16px] py-[32px] px-[16px] flex items-center">
        <img className="w-[90px]" src={selectedcarimg} alt="" />
        <div className="ml-[17px]">
          <p className="font-semibold">Mercedes Benz</p>
          <p className="text-[12px] mt-[8px] tracking-wide">
            2025 . 12 Oct - 15 Oct
          </p>
        </div>
      </div>

      {/* Booking Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p>
          Booking ID :{" "}
          <span className="text-[#6B7280] ml-[16px] font-normal">
            #RNT - 1024
          </span>
        </p>
        <div className="flex gap-[16px] mt-[8px]">
          <p>Status : </p>
          <img className="w-20 mt-[2px]" src={confirmedstatus} alt="" />
        </div>
      </div>

      {/* Pick-up Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Pick-up</p>
        <div className="mt-[19px]">
          <p>
            Location :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              Ikeja, Lagos
            </span>
          </p>
          <p>
            Date :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              12 Oct 2025
            </span>
          </p>
          <p>
            Time :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">5:00pm</span>
          </p>
        </div>
      </div>

      {/* Drop-off Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Drop-off</p>
        <div className="mt-[19px]">
          <p>
            Location :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              Victoria Island, Lagos
            </span>
          </p>
          <p>
            Date :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              15 Oct 2025
            </span>
          </p>
          <p>
            Time :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">5:00pm</span>
          </p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Payment</p>
        <div className="mt-[19px]">
          <p>
            Daily Rate :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">$200</span>
          </p>
          <p>
            Insurance :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">$49.50</span>
          </p>
          <p>
            Total :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              $249.50
            </span>
          </p>
        </div>
      </div>

      {/* Driver Info */}
      <div className="mt-[16px] py-[24px] px-[16px] font-semibold">
        <p className="font-bold text-[20px]">Driver Info</p>
        <div className="mt-[19px]">
          <p>
            Name :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              Roro Jones
            </span>
          </p>
          <p>
            Phone :{" "}
            <span className="text-[#6B7280] ml-[16px] font-normal">
              +234 8044444444
            </span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-[24px] gap-[11px]">
        <button
          onClick={handleCancelClick}
          className="w-full border border-[#D3D3D3] rounded-[10px] py-4 text-[14px]"
        >
          Cancel booking
        </button>
        <button className="w-full bg-[#2563EB] rounded-[10px] py-4 text-white text-[14px]">
          Confirm
        </button>
      </div>

      {/* Cancel Modal */}
      {showModal && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Cancel Booking Popup Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[92%] max-w-[400px] p-6 text-center">
              <div className="flex justify-between">
                <div></div>
                <img onClick={handleCloseModal} className="w-[24px] mb-2" src={close} alt="" />
              </div>
              <h2 className="font-bold text-[25px] mb-3">Cancel Booking</h2>
              <p className="text-[#6B7280] text-sm mb-6">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </p>

              <div className="flex justify-center mb-6">
                <img src={cancelbookingwarning} alt="" />
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
