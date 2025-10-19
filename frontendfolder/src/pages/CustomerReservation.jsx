import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import carimg from "../assets/bookingcarimg.svg";

function CustomerReservation() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations from API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);

        // Get the access token from localStorage
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          alert("Please login to view reservations");
          navigate("/Login");
          return;
        }

        const response = await fetch(
          "https://team-airbnb.onrender.com/api/v1/reservations/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Add Bearer token
            },
          }
        );

        if (response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/Login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        console.log("Reservations data:", data);

        // The API returns an object with a 'data' property containing the array
        const reservationsArray = data.data || data.results || data || [];

        if (!Array.isArray(reservationsArray)) {
          throw new Error("Invalid reservations data format");
        }

        // Transform reservations to match UI format
        const transformedReservations = reservationsArray.map((reservation) => {
          // Access the car object from the response
          const car = reservation.car;

          return {
            id: car?.id || reservation.car, // Car ID
            reservationId: reservation.id || reservation._id, // Reservation ID
            status: reservation.status,
            expiresAt: reservation.expires_at,
            createdAt: reservation.created_at,
            // Get actual data from the car object
            name: `${car?.make || "Unknown"} ${car?.model || "Car"}`, // e.g., "Toyota Corolla"
            type: car?.car_type || "Unknown", // e.g., "suv"
            year: car?.year || new Date().getFullYear(),
            image: car?.images || null, // Car images
          };
        });

        setReservations(transformedReservations);

        // Also save to localStorage as backup
        localStorage.setItem(
          "reservations",
          JSON.stringify(transformedReservations)
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError(err.message);

        // Fallback to localStorage if API fails
        const storedReservations =
          JSON.parse(localStorage.getItem("reservations")) || [];
        setReservations(storedReservations);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  // Remove a reservation
  const handleRemove = async (reservationId, carId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("Please login to remove reservations");
        navigate("/Login");
        return;
      }

      // Delete reservation from API
      const response = await fetch(
        `https://team-airbnb.onrender.com/api/v1/reservations/delete/${reservationId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete reservation");
      }

      // Update local state
      const updated = reservations.filter(
        (car) => car.reservationId !== reservationId
      );
      setReservations(updated);
      localStorage.setItem("reservations", JSON.stringify(updated));

      alert("Reservation removed successfully!");
    } catch (err) {
      console.error("Error removing reservation:", err);
      alert("Failed to remove reservation");
    }
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
        {loading ? (
          <p className="text-center text-gray-500 mt-6">
            Loading reservations...
          </p>
        ) : error ? (
          <div className="text-center text-red-600 mt-6">
            <p>Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-blue-600 underline"
            >
              Retry
            </button>
          </div>
        ) : reservations.length > 0 ? (
          reservations.map((car) => (
            <div
              key={car.reservationId || car.id}
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
                  <p className="capitalize">{car.type}</p>
                  <p>{car.year}</p>
                </div>
                {car.status && (
                  <p className="text-[10px] text-gray-500 mt-1 capitalize">
                    Status: {car.status}
                  </p>
                )}

                {/* Buttons */}
                <div className="mt-4 flex gap-2 text-white text-sm">
                  <button
                    onClick={() =>
                      handleRemove(car.reservationId || car.id, car.id)
                    }
                    className="bg-red-500 w-full px-4 py-3 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => navigate(`/book/${car.id}/car-booking`)}
                    className="bg-blue-600 w-full px-4 py-3 rounded-md hover:bg-blue-700 transition"
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
