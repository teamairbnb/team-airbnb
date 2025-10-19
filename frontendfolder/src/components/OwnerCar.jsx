import React, { useState, useEffect } from "react";
import mercedes from "../assets/mercedes.svg";
import editicon from "../assets/editicon.svg";
import benzlogo from "../assets/benzlogo.svg";
import deleteicon from "../assets/delete.svg";

export default function OwnerCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchCars();
  }, [refreshTrigger]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setError("Authentication error. Please login again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://team-airbnb.onrender.com/api/v1/admin/cars/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const carsData = data.results || data;
      const carsArray = Array.isArray(carsData) ? carsData : [];

      console.log("Processed cars:", carsArray);

      if (carsArray.length === 0) {
        setError("No car found");
      } else {
        setCars(carsArray);
        setError("");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(
        `https://team-airbnb.onrender.com/api/v1/admin/cars/${carId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setCars(cars.filter((car) => car.id !== carId));
      } else {
        alert("Failed to delete car");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Error deleting car");
    }
  };

  const handleEdit = (carId) => {
    window.location.href = `/EditCarDetails/${carId}`;
  };

  // Export refresh function for parent components
  useEffect(() => {
    window.refreshOwnerCars = () => setRefreshTrigger((prev) => prev + 1);
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading cars...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  if (cars.length === 0) {
    return <div className="text-center py-10">No cars available</div>;
  }

  return (
    <>
      {cars.map((car) => (
        <div key={car.id} className="flex flex-col text-[#111827] mb-6">
          <div className="bg-[#2563EB] relative px-4 py-1 w-32 flex items-center gap-3 text-white rounded-t-xl rounded-br-xl translate-y-4">
            <div className="bg-[#16A34A] h-3 w-3 rounded-full"></div>
            <p className="text-[17px]">
              {car.is_available && car.availability_status === "available"
                ? "Available"
                : car.availability_status === "rented"
                ? "Rented"
                : "Unavailable"}
            </p>
          </div>
          <img className="" src={mercedes} alt="" />
          <div className="w-full border shadow-lg rounded-b-xl px-4 pt-[18px] pb-5">
            <div className="flex justify-between">
              <div className="flex gap-[14px]">
                <img className="w-7" src={benzlogo} alt="" />
                <div className="text-xs text-start tracking-wide">
                  <p className="text-[18px] font-semibold capitalize">
                    {car.make} {car.model}
                  </p>
                  <p className="my-2 text-[#6B7280]">Model Year - {car.year}</p>
                  <p className="text-[#6B7280] capitalize">{car.car_type}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-7">
                <img
                  className="w-4 -translate-y-5 cursor-pointer"
                  src={deleteicon}
                  alt=""
                  onClick={() => handleDelete(car.id)}
                />
                <img
                  className="w-4 -translate-y-5 cursor-pointer"
                  src={editicon}
                  alt=""
                  onClick={() => handleEdit(car.id)}
                />
              </div>
            </div>

            <div className="mt-4 text-[12px] flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Body Type</p>
                <p className="capitalize">{car.car_type}</p>
              </div>

              <div className="flex justify-between">
                <p>Engine</p>
                <p className="capitalize">{car.fuel_type}</p>
              </div>

              <div className="flex justify-between">
                <p>Transmission</p>
                <p className="capitalize">{car.transmission}</p>
              </div>

              <div className="flex justify-between">
                <p>Seat</p>
                <p>{car.seats}</p>
              </div>
            </div>

            <p className="font-semibold text-start mt-4">
              ${car.hourly_rate || car.deposit_amount}{" "}
              <span className="text-[#6B7280]">/d</span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
