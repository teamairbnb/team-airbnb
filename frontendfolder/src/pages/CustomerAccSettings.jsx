import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import arrow from "../assets/arrowdn.svg";

export default function CustomerAccSettings() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const langRef = useRef(null);
  const currencyRef = useRef(null);

  const languages = ["English"];
  const currencies = ["USD ($)", "NGN (₦)"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !langRef.current?.contains(event.target) &&
        !currencyRef.current?.contains(event.target)
      ) {
        setIsLangDropdownOpen(false);
        setIsCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="min-h-screen bg-white flex flex-col relative tracking-wide">
        
      <div className="w-full bg-white">
        <div className="pt-4 pb-10">
          <NavBar />
        </div>
      </div>

      <div className="mx-4 pb-24">
        <p className="font-semibold text-[22px] mb-10">Account Settings</p>

        {/* Language Dropdown */}
        <Dropdown
          label="Language"
          selected={selectedLanguage}
          options={languages}
          isOpen={isLangDropdownOpen}
          setOpen={setIsLangDropdownOpen}
          setSelected={setSelectedLanguage}
          innerRef={langRef}
        />

        {/* Currency Dropdown */}
        <Dropdown
          label="Currency"
          selected={selectedCurrency}
          options={currencies}
          isOpen={isCurrencyDropdownOpen}
          setOpen={setIsCurrencyDropdownOpen}
          setSelected={setSelectedCurrency}
          innerRef={currencyRef}
        />

        {/* Button */}
        <div className="fixed bottom-0 left-0 w-full px-4 pb-6">
          <button className="w-full border border-[#FA5151] text-[#FA5151] py-4 rounded-xl font-semibold text-lg text-center hover:bg-[#FA5151] hover:text-white transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
