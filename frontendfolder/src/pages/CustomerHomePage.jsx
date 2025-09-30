import React, { useState } from "react";
import homebg from "../assets/homebg.jpg";
import menu from "../assets/menu.svg";
import logotext from "../assets/logotext.svg";
import usericon from "../assets/usericon.svg";
import notificon from "../assets/notificon.svg";
import search from "../assets/search.svg";
import car from "../assets/smcar.svg";
import plane from "../assets/grayplane.svg";
import location from "../assets/graylocation.svg";
import centeredmenu from "../assets/centeredmenu.svg";
import AvailableCarCard from "../components/AvailableCarCard";
import Footer from "../components/Footer";

export default function CustomerHomePage() {
  const categoriesData = [
    { icon: car, label: "All" },
    { icon: plane, label: "Airport" },
    { icon: location, label: "Nearby" },
    { icon: location, label: "Taxi" },
    { icon: plane, label: "Flight" },
    { icon: location, label: "Hotel" },
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${homebg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col h-full text-white px-[16px] pt-[8px]">
          <div className="flex justify-between">
            <div className="flex">
              <img className="w-[24px] mr-[16px]" src={menu} alt="" />
              <img src={logotext} alt="" />
            </div>
            <div className="flex items-center gap-[23px]">
              <img src={usericon} alt="" />
              <img src={notificon} alt="" />
            </div>
          </div>

          <div className="flex flex-col items-center mt-[24px]">
            <div className="font-semibold text-center text-[35px] leading-10">
              <p>Don't Rent A Car</p>
              <p>Rent Prestige</p>
            </div>
            <p className="mt-3">Premium car rental all at affordable rate</p>
          </div>

          <div className="mt-[24px] mb-[34px] bg-white rounded-[10px] h-[170px] py-[24px] px-[16px]">
            <div className="flex justify-between gap-[16px]">
              <div className="relative w-full">
                <img
                  src={search}
                  alt=""
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[19px]"
                />
                <input
                  type="text"
                  placeholder="Murtala Int Airport"
                  className="border border-[#D3D3D3] rounded-[5px] py-[11px] pl-[45px] pr-[16px] w-full tracking-wide text-[#111827] focus:outline-none focus:border-[#2563EB] placeholder-[#111827]"
                />
              </div>
              <div className="border border-[#D3D3D3] p-[10px] rounded-[5px]">
                <img className="w-[31px]" src={centeredmenu} alt="" />{" "}
              </div>
            </div>
            <button className="bg-[#2563EB] mt-[24px] w-full tracking-wide flex justify-center items-center text-white rounded-[10px] py-[14px]">
              Search anywhere
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-[24px] mx-[16px] overflow-x-auto flex gap-[8px] snap-x snap-mandatory scrollbar-hide">
        {categoriesData.map((category, index) => {
          const isActive = activeCategory === category.label;
          return (
            <div
              key={index}
              onClick={() => setActiveCategory(category.label)}
              className={`cursor-pointer min-w-[calc(33.333%-8px)] snap-start py-[14px] flex justify-center rounded-[10px] items-center ${
                isActive
                  ? "bg-[#2563EB] text-white"
                  : "bg-white text-[#6B7280]"
              }`}
            >
              <img
                src={category.icon}
                alt={category.label}
                className="mr-[8px]"
              />
              <p className="font-semibold">{category.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center mt-[24px] px-[16px]">
        {activeCategory === "All" ? (
          <>
            <AvailableCarCard />
            <AvailableCarCard />
            <AvailableCarCard />
            <AvailableCarCard />
            <AvailableCarCard />
          </>
        ) : (
          <div className="text-gray-600 text-center py-10">
            <p className="font-semibold text-lg">{activeCategory}</p>
            <p className="text-sm mt-2">
              No results for <span className="font-medium">{activeCategory}</span>
            </p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
