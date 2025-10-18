import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import carimg from "../assets/bookingcarimg.svg";

function CustomerReservation() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  // Loading reservations from localStorage
  useEffect(() => {
    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations);
  }, []);

  // Removing a reservation
  const handleRemove = (id) => {
    const updated = reservations.filter((car) => car.id !== id);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-6 bg-white">
      <NavBar />

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[400px] mt-6 px-4">
        <h1 className="text-xl font-bold">Reservations</h1>
        <button
          onClick={() => navigate("/CustomerHomePage")}
          className="text-blue-600 border border-blue-600 rounded-md px-3 py-2 font-medium hover:bg-blue-50 transition"
        >
          + Add Reservation
        </button>
      </div>

      {/* Reserved Cars */}
      <div className="flex flex-col gap-4 mt-6 w-[350px]">
        {reservations.length > 0 ? (
          reservations.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-6 px-3 py-4 border rounded-lg shadow-md w-full"
            >
              {/* Car image */}
              <div className="flex-shrink-0 w-[40%] flex justify-center items-center">
                <img
                  src={car.image || carimg}
                  alt={car.name || "Car img"}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between w-[50%] mt-2">
                <p className="font-semibold text-gray-900">{car.name}</p>
                <div className="flex gap-2 mt-1 text-[12px] text-[#6B7280]">
                  <p>{car.type}</p>
                  <p>{car.year}</p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-2 text-white text-sm">
                  <button
                    onClick={() => handleRemove(car.id)}
                    className="bg-red-500 w-full px-4 py-3 rounded-md"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => navigate(`/book/${car.id}/car-booking`)}
                    className="bg-blue-600 w-full px-4 py-3 rounded-md"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No reservations yet. Go back and reserve a car.
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomerReservation;
