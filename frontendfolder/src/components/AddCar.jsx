import React, { useState, useRef, useEffect } from "react";
import back from "../assets/back.svg";
import arrow from "../assets/arrowdn.svg";
import upload from "../assets/upload.svg";

export default function AddCar({ onBack }) {
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSeatDropdownOpen, setIsSeatDropdownOpen] = useState(false);
  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isTransmissionDropdownOpen, setIsTransmissionDropdownOpen] =
    useState(false);
  const [isFuelDropdownOpen, setIsFuelDropdownOpen] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");

  const [hasAC, setHasAC] = useState(false);
  const [hasGPS, setHasGPS] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const typeRef = useRef(null);
  const seatRef = useRef(null);
  const makeRef = useRef(null);
  const modelRef = useRef(null);
  const transmissionRef = useRef(null);
  const fuelRef = useRef(null);

  const carTypes = ["SUV", "Sedan", "Hatchback", "Coupe", "Convertible"];
  const seatNums = ["2", "4", "5+"];
  const carMakes = ["Toyota", "Honda", "BMW", "Mercedes", "Ford"];
  const carModels = ["Corolla", "Civic", "Mustang", "X5", "C-Class"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !typeRef.current?.contains(event.target) &&
        !seatRef.current?.contains(event.target) &&
        !makeRef.current?.contains(event.target) &&
        !modelRef.current?.contains(event.target) &&
        !transmissionRef.current?.contains(event.target) &&
        !fuelRef.current?.contains(event.target)
      ) {
        setIsTypeDropdownOpen(false);
        setIsSeatDropdownOpen(false);
        setIsMakeDropdownOpen(false);
        setIsModelDropdownOpen(false);
        setIsTransmissionDropdownOpen(false);
        setIsFuelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("make", selectedMake);
    formData.append("model", selectedModel);
    formData.append("year", year);
    formData.append("car_type", selectedType);
    formData.append("color", color);
    formData.append("seats", selectedSeat);
    formData.append("transmission", selectedTransmission);
    formData.append("fuel_type", selectedFuel);
    formData.append("has_ac", hasAC);
    formData.append("has_gps", hasGPS);
    formData.append("hourly_rate", hourlyRate);
    formData.append("deposit_amount", dailyPrice);
    formData.append("image", selectedImage);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://team-airbnb.onrender.com/api/v1/admin/cars/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setMessageType("success");
        setMessage("Car added successfully!");
        setTimeout(() => onBack(), 2000);
      } else {
        setMessageType("error");
        setMessage("Failed to add car. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const Dropdown = ({
    label,
    selected,
    options,
    isOpen,
    setOpen,
    setSelected,
    innerRef,
  }) => (
    <div className="mt-[25px] text-start relative" ref={innerRef}>
      <p className="text-[17px] font-semibold">{label}</p>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 cursor-pointer flex items-center justify-between"
      >
        <span className={selected ? "text-black" : "text-[#9CA3AF]"}>
          {selected || `Select ${label}`}
        </span>
        <img
          src={arrow}
          alt="Dropdown Arrow"
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-[#D3D3D3] rounded-[10px] overflow-hidden shadow-lg">
          {options.map((opt, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-[15px] text-[#333]"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="tracking-wide">
      {/* Header */}
      <div className="flex justify-center items-center relative">
        <div
          onClick={onBack}
          className="cursor-pointer left-0 absolute inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </div>
        <p className="text-[20px] font-semibold">
          <span className="text-[#6B7280]">Cars / </span>Add Car
        </p>
      </div>

      <p className="mt-[50px] text-start text-[20px] font-semibold">
        Car Details
      </p>

      {/* Make Dropdown */}
      <Dropdown
        label="Make"
        selected={selectedMake}
        options={carMakes}
        isOpen={isMakeDropdownOpen}
        setOpen={setIsMakeDropdownOpen}
        setSelected={setSelectedMake}
        innerRef={makeRef}
      />

      {/* Model Dropdown */}
      <Dropdown
        label="Model"
        selected={selectedModel}
        options={carModels}
        isOpen={isModelDropdownOpen}
        setOpen={setIsModelDropdownOpen}
        setSelected={setSelectedModel}
        innerRef={modelRef}
      />

      {/* Year */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Year</p>
        <input
          type="text"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Color */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Color</p>
        <input
          type="text"
          placeholder="Enter Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Type Dropdown */}
      <Dropdown
        label="Type"
        selected={selectedType}
        options={carTypes}
        isOpen={isTypeDropdownOpen}
        setOpen={setIsTypeDropdownOpen}
        setSelected={setSelectedType}
        innerRef={typeRef}
      />

      {/* Seat Dropdown */}
      <Dropdown
        label="Seat Number"
        selected={selectedSeat}
        options={seatNums}
        isOpen={isSeatDropdownOpen}
        setOpen={setIsSeatDropdownOpen}
        setSelected={setSelectedSeat}
        innerRef={seatRef}
      />

      {/* Transmission Dropdown */}
      <Dropdown
        label="Transmission"
        selected={selectedTransmission}
        options={transmissions}
        isOpen={isTransmissionDropdownOpen}
        setOpen={setIsTransmissionDropdownOpen}
        setSelected={setSelectedTransmission}
        innerRef={transmissionRef}
      />

      {/* Fuel Type Dropdown */}
      <Dropdown
        label="Fuel Type"
        selected={selectedFuel}
        options={fuelTypes}
        isOpen={isFuelDropdownOpen}
        setOpen={setIsFuelDropdownOpen}
        setSelected={setSelectedFuel}
        innerRef={fuelRef}
      />

      {/* Features */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Features</p>
        <div className="flex gap-5 mt-2">
          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="checkbox"
              checked={hasAC}
              onChange={() => setHasAC(!hasAC)}
              className="w-5 h-5 accent-[#2563EB]"
            />
            Has AC
          </label>
          <label className="flex items-center gap-2 text-[15px]">
            <input
              type="checkbox"
              checked={hasGPS}
              onChange={() => setHasGPS(!hasGPS)}
              className="w-5 h-5 accent-[#2563EB]"
            />
            Has GPS
          </label>
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Hourly Rate</p>
        <input
          type="text"
          placeholder="Enter Hourly Rate"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Deposit Amount */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Daily Price</p>
        <input
          type="text"
          placeholder="Enter Daily Price"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
          className="w-full rounded-[10px] border border-[#D3D3D3] py-[14px] px-[16px] mt-2 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Image Upload */}
      <div className="mt-[25px] text-start">
        <p className="text-[17px] font-semibold">Car Image</p>
        <label
          htmlFor="carImageUpload"
          className="flex flex-col items-center justify-center w-full h-[160px] border-2 border-dashed border-gray-300 rounded-[10px] mt-2 bg-white cursor-pointer hover:border-[#2563EB] transition-all"
        >
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <img src={upload} alt="" />
              <p>Upload image here</p>
            </div>
          )}
          <input
            id="carImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Submit */}
      <div className="mt-[34px] pb-10">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#2563EB] w-full rounded-[10px] text-white py-4 font-semibold cursor-pointer hover:bg-[#1d4ed8] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Done"}
        </button>
        {message && (
          <div
            className={`mt-4 p-3 rounded-[10px] text-center font-semibold ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
