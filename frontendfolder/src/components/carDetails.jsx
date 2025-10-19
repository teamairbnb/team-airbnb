import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Calendar, Settings, Info } from "lucide-react";
import back from "../assets/back.svg";
import CarDetailsImg from "../assets/cardetailspage.jpg";
import { useCarContext } from "../components/FetchCarDetails";

export default function CarBookingScreen() {
  const { carId } = useParams();
  const { car, setCar } = useCarContext();

  // If no car is found 
  if (!car) {
    return (
      <div className="text-center mt-20">
        <p>No car selected.</p>
        <Link to="/CustomerHomePage" className="mt-4 underline text-blue-600">
          Go back
        </Link>
      </div>
    );
  }

  // Preserving the base/original price
  const basePrice = car?.originalPrice || car?.price || 0;

  const savedBooking = localStorage.getItem("selectedBooking") || "best";
  const savedMileage = localStorage.getItem("selectedMileage") || "unlimited";

  const [selectedBooking, setSelectedBooking] = useState(savedBooking);
  const [selectedMileage, setSelectedMileage] = useState(savedMileage);
  const [displayPrice, setDisplayPrice] = useState(basePrice);

  // Persist selections
  useEffect(() => {
    localStorage.setItem("selectedBooking", selectedBooking);
  }, [selectedBooking]);

  useEffect(() => {
    localStorage.setItem("selectedMileage", selectedMileage);
  }, [selectedMileage]);

  const totalPrice = selectedBooking === "flexible" ? basePrice * 0.2 : basePrice;



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
          <Link
            to="/CustomerReservation"
            className="absolute top-4 left-4 flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
          >
            <img className="w-4" src={back} alt="Back" />
          </Link>
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
            <h2 className="text-lg font-semibold mb-3 text-left">
              Booking option
            </h2>

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

            {/* Flexible */}
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
                    <h3 className="font-semibold mb-1 text-left">
                      Stay Flexible
                    </h3>
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
                    <h3 className="font-semibold mb-1 text-left">
                      Unlimited miles
                    </h3>
                    <p className="text-sm text-gray-600 text-left">
                      All miles are included in the price
                    </p>
                  </div>
                </div>
                <Info className="w-5 h-5 text-gray-400 ml-2" />
              </div>
            </div>
          </div>

          <div className="px-0 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-left">Total</h3>
                <button className="text-sm text-gray-600 underline">
                  Price details
                </button>
              </div>
              <div className="text-2xl font-bold">${totalPrice}</div>
            </div>

            {/* Updating car in context and localStorage */}
            <Link
              to={`/book/${carId}/PickUp`}
              state={{ carName: car?.name }}
              onClick={() => {
                const updatedCar = {
                  ...car,
                  price: totalPrice,
                  originalPrice: basePrice,
                };
                setCar(updatedCar);
                localStorage.setItem("selectedCar", JSON.stringify(updatedCar));
              }}
              className="block w-full my-4 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
