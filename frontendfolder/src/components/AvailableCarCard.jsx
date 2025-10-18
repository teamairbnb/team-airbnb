import React from "react";
import mercedes from "../assets/mercedes.svg";
import { useNavigate } from "react-router-dom";

export default function AvailableCarCard({ car }) {
  const navigate = useNavigate();

  const handleReserve = () => {
    // Get existing reservations
    const existing = JSON.parse(localStorage.getItem("reservations")) || [];

    // Check if this car already exists (avoid duplicates)
    const alreadyReserved = existing.some((item) => item.id === car.id);
    if (!alreadyReserved) {
      existing.push(car);
      localStorage.setItem("reservations", JSON.stringify(existing));
    }

    // Navigate to reservation page
    navigate(`/CustomerReservation`);
  };

  return (
    <div className="w-full rounded-[10px] bg-white mb-[25px] shadow-lg">
      <img className="w-full" src={car.image || mercedes} alt={car.name} />

      <div className="m-[16px] tracking-wide">
        <p className="font-semibold text-[20px]">{car.name}</p>

        <div className="text-[#6B7280] mt-[3px] flex font-semibold items-center gap-[4px] text-[12px]">
          <p>{car.type}</p>
          <p className="-mt-2">.</p>
          <p>{car.mode}</p>
          <p className="-mt-2">.</p>
          <p>{car.seatnum} Seats</p>
          <p className="-mt-2">.</p>
          <p>{car.year}</p>
        </div>

        <div className="h-[1px] bg-[#D3D3D3] mb-[15px] w-full mt-[32px] opacity-50"></div>

        <div className="flex items-center justify-between font-semibold">
          <p>
            ${car.price} <span>/d</span>
          </p>
          <button
            onClick={handleReserve}
            className="bg-[#2563EB] tracking-wide flex justify-center items-center text-white rounded-[10px] py-[14px] px-[21px] hover:bg-[#1D4ED8] transition-all duration-200"
          >
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
}
