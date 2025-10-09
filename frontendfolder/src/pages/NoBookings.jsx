import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import vehicleIcon from "../assets/vehicleIcon.svg"

function NoBookings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  w-full min-h-screen bg-white py-8 px-4">
      {/* Back Button */}
      <div className="w-full max-w-[400px] mb-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 bg-[#D3D3D399] rounded"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Header Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Your Booking</h1>

      {/* Add Booking Button */}
      <button
        onClick={() => navigate("/add-booking")}
        className="text-blue-600 border border-blue-600 rounded-md px-4 w-40 py-2 font-medium mb-12"
      >
        + Add Booking
      </button>

      {/* No bookings message */}
      <div className="flex gap-5 items-start text-left">
        <div>
            <img
                  src={vehicleIcon}
                  alt={vehicleIcon}
                  className="w-full h-full object-contain"
                />
        </div>
        <div>
            <h1 className="font-semibold text-sm">No new bookings</h1>
            <p className="text-xs">Your upcoming rentals will appear here. Make a new booking today!</p>
            {/*Link to browse cars*/}
            <p className="text-xs font-semibold underline mt-5">Browse cars</p>
        </div>
      </div>
    </div>
  );
}

export default NoBookings;
