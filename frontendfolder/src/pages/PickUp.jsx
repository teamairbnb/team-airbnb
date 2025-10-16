import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import back from "../assets/back.svg";
import { useCarContext } from "../components/FetchCarDetails";

export default function PickUp() {
  const navigate = useNavigate();
  const { car, bookingDetails, setBookingDetails } = useCarContext();

  const handleChange = (field, value) => {
    setBookingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const { pickUpDate, pickUpTime, returnDate, returnTime } = bookingDetails;

    if (!pickUpDate || !pickUpTime || !returnDate || !returnTime) {
      alert("Please select both date and time for pick-up and return.");
      return;
    }

    const pickUp = new Date(`${pickUpDate}T${pickUpTime}`);
    const returnD = new Date(`${returnDate}T${returnTime}`);
    if (returnD <= pickUp) {
      alert("Return date/time must be after pick-up date/time.");
      return;
    }

    navigate(`/book/${car.id}/ReviewBooking`);
  };

  const backUrl = `/book/${car.id}/car-booking`;

  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        <Link
          to={backUrl}
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Select pick-up</p>

        <div className="px-[5px] mt-[25px]">
          <p>Pick-up & return</p>
          <div className="w-full flex items-center justify-between border border-[#D3D3D3] rounded-[8px] mt-4 py-[14px] px-[16px]">
            <p className="text-[14px] text-[#717171]">company pickup address</p>
            <Info className="w-4 h-4 text-[#717171] ml-2" />
          </div>
        </div>

        <div className="bg-white p-[5px] rounded-2xl shadow-sm mt-[60px]">
          <div className="grid grid-cols-2 gap-4">
            {/* Pick-up */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium">Pick-up</label>
              <div className="border border-gray-200 rounded-xl mt-[16px] p-3">
                <input
                  type="date"
                  value={bookingDetails.pickUpDate || ""}
                  onChange={(e) => handleChange("pickUpDate", e.target.value)}
                  className="outline-none w-full bg-transparent text-gray-700 mb-3"
                  min={new Date().toISOString().split("T")[0]}
                />
                <input
                  type="time"
                  value={bookingDetails.pickUpTime || ""}
                  onChange={(e) => handleChange("pickUpTime", e.target.value)}
                  className="outline-none w-full bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Return */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium">Return</label>
              <div className="border border-gray-200 rounded-xl mt-[16px] p-3">
                <input
                  type="date"
                  value={bookingDetails.returnDate || ""}
                  onChange={(e) => handleChange("returnDate", e.target.value)}
                  className="outline-none w-full bg-transparent text-gray-700 mb-3"
                  min={
                    bookingDetails.pickUpDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
                <input
                  type="time"
                  value={bookingDetails.returnTime || ""}
                  onChange={(e) => handleChange("returnTime", e.target.value)}
                  className="outline-none w-full bg-transparent text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="block w-full my-4 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
}
