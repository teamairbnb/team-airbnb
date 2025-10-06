import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, MapPin, Calendar, Settings, Info } from "lucide-react";
import back from "../assets/back.svg";
import CarDetailsImg from "../assets/cardetailspage.jpg";

export default function CarBookingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car; 

  const [selectedBooking, setSelectedBooking] = useState("best");
  const [selectedMileage, setSelectedMileage] = useState("unlimited");
  const [displayPrice, setDisplayPrice] = useState(car?.price || 0);

  useEffect(() => {
    if (selectedBooking === "flexible") {
      setDisplayPrice(car.price * 0.2); // 20% of full price
    } else {
      setDisplayPrice(car.price); // full price
    }
  }, [selectedBooking, car.price]);

  if (!car) {
    return (
      <div className="text-center mt-20">
        <p>No car selected.</p>
        <button
          onClick={() => navigate("/CustomerHomePage")}
          className="mt-4 underline text-blue-600"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white min-h-screen">
        {/* Car Image */}
        <div className="relative mb-6 bg-black">
          <img
            src={CarDetailsImg}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => navigate("/CustomerHomePage")}
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 py-[10px] pl-[14px] pr-[6px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
          >
            <img src={back} alt="Back" />
          </button>
        </div>

        {/* Car Details */}
        <div className="px-[16px]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4 text-left">{car.name}</h1>

            <div className="flex items-center mb-3">
              <div className="flex items-center gap-2 text-gray-600 w-1/2">
                <Settings className="w-4 h-4" />
                <span className="text-sm">{car.seatnum} Seats</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 w-1/2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">200m</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex items-center gap-2 text-gray-600 w-1/2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{car.year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 w-1/2">
                <Settings className="w-4 h-4" />
                <span className="text-sm">{car.mode}</span>
              </div>
            </div>
          </div>

          {/* Booking Options */}
          <div className="px-0 mb-6 mt-11">
            <h2 className="text-lg font-semibold mb-3 text-left">Booking option</h2>

            {/* Best Price */}
            <div
              onClick={() => setSelectedBooking("best")}
              className={`border-2 rounded-2xl p-4 mb-3 cursor-pointer transition ${
                selectedBooking === "best"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedBooking === "best"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedBooking === "best" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-left">Best Price</h3>
                    <p className="text-sm text-gray-600 text-left">
                      Pay full payment now, and get rewards
                    </p>
                  </div>
                </div>
                <Info className="w-5 h-5 text-gray-400 ml-2" />
              </div>
            </div>

            {/* Stay Flexible */}
            <div
              onClick={() => setSelectedBooking("flexible")}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                selectedBooking === "flexible"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedBooking === "flexible"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedBooking === "flexible" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-left">Stay Flexible</h3>
                    <p className="text-sm text-gray-600 text-left">
                      Pay 20% now, remaining 80% during pick up
                    </p>
                  </div>
                </div>
                <Info className="w-5 h-5 text-gray-400 ml-2" />
              </div>
            </div>
          </div>

          {/* Mileage */}
          <div className="px-0 mb-6">
            <h2 className="text-lg font-semibold mb-3 text-left">Mileage</h2>
            <div
              onClick={() => setSelectedMileage("unlimited")}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition ${
                selectedMileage === "unlimited"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedMileage === "unlimited"
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMileage === "unlimited" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-left">Unlimited miles</h3>
                    <p className="text-sm text-gray-600 text-left">
                      All miles are included in the price
                    </p>
                  </div>
                </div>
                <Info className="w-5 h-5 text-gray-400 ml-2" />
              </div>
            </div>
          </div>

          {/* Total and Next Button */}
          <div className="px-0 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-left">Total</h3>
                <button className="text-sm text-gray-600 underline">
                  Price details
                </button>
              </div>
              <div className="text-2xl font-bold">${displayPrice}</div>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
