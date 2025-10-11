import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { CARS_DATA } from "../utils/cars";

const CarContext = createContext(null);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error("useCarContext must be used within FetchCarDetails");
  return context;
};

export default function FetchCarDetails() {
  const { carId } = useParams();

  const [car, setCar] = useState(() => {
    const foundCar = CARS_DATA.find((c) => c.id === parseInt(carId));
    return foundCar || null;
  });

  const [bookingDetails, setBookingDetails] = useState({
    pickUpDate: "",
    pickUpTime: "",
    returnDate: "",
    returnTime: "",
  });

  const [totalPrice, setTotalPrice] = useState(car ? car.price : 0);

  if (!car) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">Car not found.</p>
      </div>
    );
  }

  return (
    <CarContext.Provider
      value={{
        car,
        setCar,
        bookingDetails,
        setBookingDetails,
        totalPrice,
        setTotalPrice, // ✅ context now manages totalPrice
      }}
    >
      <Outlet />
    </CarContext.Provider>
  );
}
