import React, { useState } from "react";
import mercedes from "../assets/mercedes.svg";
import { useNavigate } from "react-router-dom";

export default function AvailableCarCard({ car }) {
  const navigate = useNavigate();
  const [isReserving, setIsReserving] = useState(false);

  const handleReserve = async () => {
    try {
      setIsReserving(true);

      // Getting the access token from localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Please login to reserve a car");
        navigate("/Login");
        return;
      }

      // Ensuring car.id is a valid integer
      const carId = parseInt(car.id);

      if (!carId || isNaN(carId)) {
        alert("Invalid car ID. Please try another car.");
        return;
      }

      const requestBody = { car_id: carId };
      console.log("Creating reservation with:", requestBody);

      // Creating reservation via API
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
        // Handling 400 Bad Request
        let errorMessage = "Failed to create reservation";

        if (data.error) {
          errorMessage = data.error;

          // handling for "already reserved" error
          if (
            data.error.toLowerCase().includes("already") &&
            data.error.toLowerCase().includes("reserved")
          ) {
            alert(
              "This car has already been reserved. Please choose another car."
            );
            return;
          }
        } else if (data.car_id) {
          errorMessage = Array.isArray(data.car_id)
            ? data.car_id.join(", ")
            : data.car_id;
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

      // Saving the reservation data to localStorage
      const existing = JSON.parse(localStorage.getItem("reservations")) || [];

      const reservationData = {
        id: car.id,
        reservationId: data.id || data._id,
        status: data.status || "pending",
        expiresAt: data.expires_at,
        createdAt: data.created_at,
        name: `${car.make} ${car.model}`,
        type: car.type,
        year: car.year,
        image: car.image,
      };

      // Check if already exists
      const alreadyReserved = existing.some(
        (item) => item.reservationId === reservationData.reservationId
      );

      if (!alreadyReserved) {
        existing.push(reservationData);
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

const getCarImage = () => {
  const cloudinaryBase = "https://res.cloudinary.com/dmcortp4y/";

  if (!car.image) return mercedes; // fallback placeholder
  if (typeof car.image === "string") return cloudinaryBase + car.image;
  if (Array.isArray(car.image) && car.image.length > 0) return cloudinaryBase + car.image[0];
  return mercedes;
};


  return (
    <div className="w-full rounded-[10px] bg-white mb-[25px] shadow-lg">
      <img
        className="w-full rounded-t-[10px]"
        src={getCarImage()}
        alt={`${car.make} ${car.model}`}
        onError={(e) => {
          e.target.src = mercedes;
        }}
      />

      <div className="m-[16px] tracking-wide">
        <p className="font-semibold text-[20px] capitalize">
          {car.make} {car.model}
        </p>

        <div className="text-[#6B7280] mt-[3px] flex font-semibold items-center gap-[4px] text-[12px] capitalize">
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
