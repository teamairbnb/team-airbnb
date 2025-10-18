import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { CARS_DATA } from "../utils/cars";

const CarContext = createContext(null);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context)
    throw new Error("useCarContext must be used within FetchCarDetails");
  return context;
};

export default function FetchCarDetails() {
  const { carId } = useParams();

  const [car, setCar] = useState(() => {
    const foundCar = CARS_DATA.find((c) => c.id === parseInt(carId));
    return foundCar || null;
  });

  const [bookingDetails, setBookingDetails] = useState(() => {
    const saved = localStorage.getItem("bookingDetails");
    return saved
      ? JSON.parse(saved)
      : {
          pickUpDate: "",
          pickUpTime: "",
          returnDate: "",
          returnTime: "",
          pickUpLocation: "",
          dropOffLocation: "",
          bookingId: "",
          driverName: "",
          driverPhone: "",
        };
  });

  const [totalPrice, setTotalPrice] = useState(car ? car.price : 0);

  // storing all reserved cars
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  // Adding car to reservations
  const addReservation = (car) => {
    setReservations((prev) => {
      const exists = prev.some((item) => item.id === car.id);
      if (!exists) {
        const updated = [...prev, car];
        localStorage.setItem("reservations", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  // removing a car
  const removeReservation = (carId) => {
    setReservations((prev) => {
      const updated = prev.filter((c) => c.id !== carId);
      localStorage.setItem("reservations", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
  }, [bookingDetails]);

  if (!car) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">Car not found.</p>
      </div>
    );
  }

  return (
    <CarContext.Provider
      key={carId}
      value={{
        car,
        setCar,
        bookingDetails,
        setBookingDetails,
        totalPrice,
        setTotalPrice,
        reservations,
        addReservation,
        removeReservation,
      }}
    >
      <Outlet />
    </CarContext.Provider>
  );
}
