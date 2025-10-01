import React, { useState } from "react";
import { ChevronLeft, MapPin, Calendar, Settings, Info } from "lucide-react";

export default function CarBookingScreen() {
  const [selectedBooking, setSelectedBooking] = useState("best");
  const [selectedMileage, setSelectedMileage] = useState("unlimited");

  return (
    <div className="w-[358px] mx-auto bg-white min-h-screen">
      {/* Car Image */}
      <div className="relative mb-6">
        <img
          src="https://i.ibb.co/x8GjbRxN/cardetails.jpg"
          alt="Mercedes Benz"
          className="w-full h-auto"
        />
      </div>

      {/* Car Details */}
      <div className="px-0 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-left">Mercedes Benz</h1>

        <div className="flex items-center mb-3">
          <div className="flex items-center gap-2 text-gray-600 w-1/2">
            <Settings className="w-4 h-4" />
            <span className="text-sm">5 Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 w-1/2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">200m</span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2 text-gray-600 w-1/2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">2025</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 w-1/2">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Auto</span>
          </div>
        </div>
      </div>

      {/* Booking Options */}
      <div className="px-0 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-left">Booking option</h2>

        {/* Best Price Option */}
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

        {/* Stay Flexible Option */}
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

      {/* Total and Next Button */}
      <div className="px-0 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-left">Total</h3>
            <button className="text-sm text-gray-600 underline">
              Price details
            </button>
          </div>
          <div className="text-2xl font-bold">$200.60</div>
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition">
          Next
        </button>
      </div>
    </div>
  );
}
