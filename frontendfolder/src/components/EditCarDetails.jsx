import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import back from "../assets/back.svg";
import carImg from "../assets/blackcar.svg";
import arrow from "../assets/arrowdn.svg";

export default function EditCarDetails() {
  const { carId } = useParams(); 
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isFuelDropdownOpen, setIsFuelDropdownOpen] = useState(false);
  const [isSeatDropdownOpen, setIsSeatDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");

  const typeRef = useRef(null);
  const fuelRef = useRef(null);
  const seatRef = useRef(null);

  const carTypes = ["SUV", "Sedan", "Hatchback", "Coupe", "Convertible"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const seatNums = ["2", "4", "5+"];

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await fetch(
          `https://team-airbnb.onrender.com/api/v1/admin/cars/${carId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch car details");

        const data = await res.json();
        setCarData(data);
        setSelectedType(data.car_type || "");
        setSelectedFuel(data.fuel_type || "");
        setSelectedSeat(data.seats ? String(data.seats) : "");
      } catch (err) {
        console.error("fetchCarDetails error:", err);
        setError(err.message || "Error loading car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        typeRef.current && !typeRef.current.contains(event.target) &&
        fuelRef.current && !fuelRef.current.contains(event.target) &&
        seatRef.current && !seatRef.current.contains(event.target)
      ) {
        setIsTypeDropdownOpen(false);
        setIsFuelDropdownOpen(false);
        setIsSeatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div className="text-center py-10">Loading car...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="px-4 py-8">
      <div className="relative flex items-center justify-center">
        <Link to="/BusinessOwnerDashboard" className="absolute left-0">
          <div className="cursor-pointer inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black">
            <img className="w-4" src={back} alt="Back" />
          </div>
        </Link>

        <p className="text-[20px] font-semibold">
          <span className="text-[#6B7280]">Cars / </span>Edit
        </p>
      </div>

      <div className="flex justify-center">
        <img src={carImg} alt="" className="mt-[70px]" />
      </div>

      {/* Make */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Make</p>
        <input
          type="text"
          defaultValue={carData.make}
          placeholder="Enter Make Name"
          className="capitalize w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Model */}
      <div className="mt-[35px] text-start">
        <p className="text-[17px] font-semibold">Model</p>
        <input
          type="text"
          defaultValue={carData.model}
          placeholder="Enter Model Name"
          className="capitalize w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Year */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Year</p>
        <input
          type="text"
          defaultValue={carData.year}
          placeholder="Enter Year"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Transmission */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Transmission</p>
        <input
          type="text"
          defaultValue={carData.transmission}
          placeholder="Enter Transmission"
          className="capitalize w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Type Dropdown */}
      <div className="mt-[25px] text-start relative" ref={typeRef}>
        <p className="text-[17px] font-semibold">Type</p>
        <div
          onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
          className="capitalize relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedType ? "text-black" : "text-[#9CA3AF]"}>
            {selectedType || "Select Type"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isTypeDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isTypeDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {carTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(type);
                  setIsTypeDropdownOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fuel Type Dropdown */}
      <div className="mt-[25px] text-start relative" ref={fuelRef}>
        <p className="text-[17px] font-semibold">Fuel Type</p>
        <div
          onClick={() => setIsFuelDropdownOpen((prev) => !prev)}
          className="capitalize relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedFuel ? "text-black" : "text-[#9CA3AF]"}>
            {selectedFuel || "Select Fuel Type"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isFuelDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isFuelDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {fuelTypes.map((fuel, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedFuel(fuel);
                  setIsFuelDropdownOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {fuel}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seat Dropdown */}
      <div className="mt-[25px] text-start relative" ref={seatRef}>
        <p className="text-[17px] font-semibold">Seat Number</p>
        <div
          onClick={() => setIsSeatDropdownOpen((prev) => !prev)}
          className="relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
        >
          <span className={selectedSeat ? "text-black" : "text-[#9CA3AF]"}>
            {selectedSeat || "Select Seat Number"}
          </span>
          <img
            src={arrow}
            alt="Dropdown Arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              isSeatDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {isSeatDropdownOpen && (
          <div className="z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden">
            {seatNums.map((num, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedSeat(num);
                  setIsSeatDropdownOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Daily Price</p>
        <input
          type="text"
          defaultValue={carData.hourly_rate}
          placeholder="Enter Price"
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      <div className="mt-[34px]">
        <button className="bg-[#2563EB] w-full rounded-[10px] text-white py-4">
          Done
        </button>
      </div>
    </div>
  );
}
