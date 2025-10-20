import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import Button from "../components/Button.jsx";
import mercedes from "../assets/mercedes.svg";

function MyBookings() {
  const [activeTab, setActiveTab] = useState("active");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    setBookings(storedBookings);
  }, []);

  const filtered = bookings.filter((b) => {
    if (activeTab === "active") return b.status === "pending" || b.status === "confirmed";
    if (activeTab === "past") return b.status === "completed";
    return b.status === activeTab;
  });

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-6 bg-white">
      <NavBar />

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[400px] mt-6 px-4">
        <h1 className="text-xl font-bold">My Booking</h1>
        <button
          onClick={() => navigate("/CustomerHomePage")}
          className="text-blue-600 border border-blue-600 rounded-md px-3 py-2 font-medium"
        >
          + Add Booking
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 w-full max-w-[400px] mt-6">
        {["active", "past", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 w-28 py-2 rounded-md font-medium border transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Car List */}
      <div className="flex flex-col gap-4 mt-6 w-[350px]">
        {filtered.length > 0 ? (
          filtered.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-6 px-3 py-4 border rounded-lg shadow-md w-full"
            >
              {/* Car image with fallback */}
              <div className="flex-shrink-0 w-[40%] flex justify-center items-center">
                <img
                  src={car.image || mercedes}
                  alt={car.name || "Car image"}
                  onError={(e) => (e.target.src = mercedes)}
                  className="w-full rounded-md object-cover"
                />
              </div>

              {/* Car details */}
              <div className="flex flex-col justify-between w-[50%] mt-2">
                <p className="font-semibold text-gray-900">{car.name}</p>
                <p className="text-xs text-gray-500">{car.date}</p>

                <p className="text-xs mt-2 text-gray-600">
                  Status:
                  <span
                    className={`ml-1 px-2 py-0.5 rounded-sm text-xs font-medium ${
                      car.status === "pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : car.status === "confirmed"
                        ? "bg-green-600/10 text-green-600"
                        : car.status === "completed"
                        ? "bg-green-600/10 text-green-600"
                        : "bg-red-600/10 text-red-600"
                    }`}
                  >
                    {car.status?.charAt(0).toUpperCase() + car.status?.slice(1)}
                  </span>
                </p>

                <div className="mt-4">
                  <Button
                    text="View Details"
                    className="w-fit px-4 py-2 text-sm"
                    onClick={() => navigate(`/booking/${car.id}`)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No {activeTab} bookings found.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
