import React, { createContext, useState, useContext, useEffect } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";

const CarContext = createContext(null);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context)
    throw new Error("useCarContext must be used within FetchCarDetails");
  return context;
};

export default function FetchCarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [totalPrice, setTotalPrice] = useState(0);

  // Storing all reserved cars
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem("reservations");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch car details from API
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);

        const accessToken = localStorage.getItem("access_token");
        if (!accessToken)
          throw new Error("Not authenticated. Please log in again.");

        const response = await fetch(
          `https://team-airbnb.onrender.com/api/v1/admin/cars/${carId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 404) {
          throw new Error(
            "Car not found. It may have been removed or unavailable."
          );
        }
        if (!response.ok) {
          throw new Error(`Failed to fetch car: ${response.statusText}`);
        }

        const data = await response.json();

        const transformedCar = {
          id: data.id || data._id,
          make: data.make,
          model: data.model,
          year: data.year,
          type: data.car_type,
          color: data.color,
          seats: data.seats,
          transmission: data.transmission,
          fuelType: data.fuel_type,
          hasAC: data.has_ac,
          hasGPS: data.has_gps,
          price: parseFloat(data.hourly_rate),
          deposit: parseFloat(data.deposit_amount),
          isAvailable: data.is_available,
          isActive: data.is_active,
          availabilityStatus: data.availability_status,
          name: `${data.make} ${data.model}`,
        };

        setCar(transformedCar);
        setTotalPrice(transformedCar.price);
        setError(null);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError(err.message);

        const savedReservations =
          JSON.parse(localStorage.getItem("reservations")) || [];
        const foundCar = savedReservations.find(
          (c) => c.id === parseInt(carId)
        );
        if (foundCar) {
          setCar(foundCar);
          setTotalPrice(foundCar.price);
          setError(null);
        }
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

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

  // Removing a car
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "Car not found."}
          </p>
          <button
            onClick={() => navigate("/CustomerHomePage")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
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
