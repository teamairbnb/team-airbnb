import React, { useState } from "react";
import mercedes from "../assets/mercedes.svg";
import { useNavigate } from "react-router-dom";

export default function AvailableCarCard({ car }) {
  const navigate = useNavigate();
  const [isReserving, setIsReserving] = useState(false);

  const handleReserve = async () => {
    try {
      setIsReserving(true);

      // Get the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Please login to reserve a car");
        navigate("/Login");
        return;
      }

      // Ensure car.id is a valid integer
      const carId = parseInt(car.id);

      if (!carId || isNaN(carId)) {
        alert("Invalid car ID. Please try another car.");
        return;
      }

      const requestBody = { car: carId };
      console.log("Creating reservation with:", requestBody);

      // Create reservation via API
      const response = await fetch(
        "https://team-airbnb.onrender.com/api/v1/reservations/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response status:", response.status);

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/Login");
        return;
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        // Handle 400 Bad Request with detailed error
        let errorMessage = "Failed to create reservation";

        if (data.error) {
          errorMessage = data.error;

          // Special handling for "already reserved" error
          if (
            data.error.toLowerCase().includes("already") &&
            data.error.toLowerCase().includes("reserved")
          ) {
            alert(
              "This car has already been reserved. Please choose another car."
            );
            return;
          }
        } else if (data.car) {
          errorMessage = Array.isArray(data.car)
            ? data.car.join(", ")
            : data.car;
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === "string") {
          errorMessage = data;
        }

        throw new Error(errorMessage);
      }

      console.log("Reservation created successfully:", data);

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("reservations")) || [];
      const alreadyReserved = existing.some((item) => item.id === car.id);
      if (!alreadyReserved) {
        existing.push(car);
        localStorage.setItem("reservations", JSON.stringify(existing));
      }

      alert("Car reserved successfully!");

      // Navigate to reservation page
      navigate(`/CustomerReservation`);
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert(`Failed to reserve car: ${error.message}`);
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="w-full rounded-[10px] bg-white mb-[25px] shadow-lg">
      <img
        className="w-full"
        src={car.image || mercedes}
        alt={`${car.make} ${car.model}`}
      />

      <div className="m-[16px] tracking-wide">
        {/* Car Name: Make + Model */}
        <p className="font-semibold text-[20px]">
          {car.make} {car.model}
        </p>

        {/* Car Details: Type, Transmission, Seats, Year */}
        <div className="text-[#6B7280] mt-[3px] flex font-semibold items-center gap-[4px] text-[12px]">
          <p>{car.type}</p>
          <p className="-mt-2">.</p>
          <p>{car.transmission}</p>
          <p className="-mt-2">.</p>
          <p>{car.seats} Seats</p>
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
            disabled={isReserving}
            className={`bg-[#2563EB] tracking-wide flex justify-center items-center text-white rounded-[10px] py-[14px] px-[21px] hover:bg-[#1D4ED8] transition-all duration-200 ${
              isReserving ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isReserving ? "Reserving..." : "Reserve Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
