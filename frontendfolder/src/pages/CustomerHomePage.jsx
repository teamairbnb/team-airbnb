import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import homebg from "../assets/homebg.jpg";
import menu from "../assets/menu.svg";
import logotext from "../assets/logotext.svg";
import usericon from "../assets/usericon.svg";
import notificon from "../assets/notificon.svg";
import search from "../assets/search.svg";
import centeredmenu from "../assets/centeredmenu.svg";
import logo_textblack from "../assets/logo_textblack.svg";
import smblackcar from "../assets/smblackcar.svg";
import bookicon from "../assets/bookicon.svg";
import blackusericon from "../assets/blackusericon.svg";
import blackchaticon from "../assets/blackchaticon.svg";
import blacknotificon from "../assets/blacknotificon.svg";
import settingsicon from "../assets/settingsicon.svg";
import AvailableCarCard from "../components/AvailableCarCard";
import CarFilterMenu from "../components/CarFilterMenu";
import { CARS_DATA, CATEGORY_DATA } from "../utils/cars";

export default function CustomerHomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState(CARS_DATA.slice(0, 8));

  const handleApplyFilters = ({ carYear, priceRange, carType }) => {
    let results = CARS_DATA;
    if (carType) results = results.filter((c) => c.type === carType);
    if (carYear) results = results.filter((c) => c.year === carYear);
    if (priceRange) {
      const [min, max] = priceRange
        .replace(/\$/g, "")
        .split("-")
        .map((p) => parseInt(p));
      results = results.filter((c) => c.price >= min && c.price <= max);
    }
    if (!carType && !carYear && !priceRange) results = CARS_DATA;
    setFilteredCars(results);
  };

  const handleResetFilters = () => setFilteredCars(CARS_DATA);

  const sidebarItems = [
    { label: "Browse car", icon: smblackcar, path: "/CustomerHomePage" },
    { label: "Dashboard", icon: smblackcar, path: "/CustomerDashboard" },
    { label: "My Booking", icon: bookicon, path: "/MyBookings" },
    { label: "Profile", icon: blackusericon, path: "/UserProfile" },
    { label: "Chat", icon: blackchaticon, path: "/LiveChat" },
    {
      label: "Reservation",
      icon: bookicon,
      pathTemplate: "/CustomerReservation",
    },
    { label: "Notification", icon: blacknotificon, path: "/Notifications" },
    { label: "Settings", icon: settingsicon, path: "/Settings" },
  ];

  return (
    <>
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-[57px]">
          <button
            className="text-gray-500 mb-[36px] px-[35px] font-semibold"
            onClick={() => setSidebarOpen(false)}
          >
            <img className="w-16" src={logo_textblack} alt="" />
          </button>

          <ul className="space-y-[8px] text-[#111827] font-semibold tracking-wide">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSidebarOpen(false);

                    if (item.path === "/LiveChat") {
                      navigate(item.path, {
                        state: {
                          backTo: "/CustomerHomePage",
                          role: "Customer",
                        },
                      });
                      return;
                    }

                    if (item.pathTemplate) {
                      const reservations =
                        JSON.parse(localStorage.getItem("reservations")) || [];
                      if (reservations.length === 0) {
                        alert("You haven’t reserved any car yet!");
                        return;
                      }

                      const latestCar = reservations[reservations.length - 1];
                      const resolvedPath = item.pathTemplate.replace(
                        ":carId",
                        latestCar.id
                      );

                      navigate(resolvedPath);
                      return;
                    }

                    navigate(item.path);
                  }}
                  className={`cursor-pointer gap-[8px] p-[16px] flex transition-all duration-200 ${
                    isActive
                      ? "bg-[#DEE8FC] text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  <img className="w-[22px]" src={item.icon} alt="" />
                  <p>{item.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${homebg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col h-full text-white px-[16px] pt-[8px]">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                className="w-[24px] mr-[16px] cursor-pointer"
                src={menu}
                alt="Menu"
                onClick={() => setSidebarOpen(true)}
              />
              <img src={logotext} alt="" />
            </div>
            <div className="flex items-center gap-[23px]">
              <Link to="/UserProfile" className="p-[6px] rounded-full">
                <img src={usericon} alt="User" className="cursor-pointer" />
              </Link>

              <img src={notificon} alt="" />
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col items-center mt-[24px]">
            <div className="font-semibold text-center text-[35px] leading-10">
              <p>Don't Rent A Car</p>
              <p>Rent Prestige</p>
            </div>
            <p className="mt-3">Premium car rental all at affordable rate</p>
          </div>

          {/* Search Box */}
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

              <button
                onClick={() => setFilterMenuOpen(true)}
                className="border border-[#D3D3D3] p-[10px] rounded-[5px] bg-white"
              >
                <img className="w-[31px]" src={centeredmenu} alt="Menu" />
              </button>
            </div>

            <button className="bg-[#2563EB] mt-[24px] w-full tracking-wide flex justify-center items-center text-white rounded-[10px] py-[14px]">
              Search anywhere
            </button>
          </div>
        </div>
      </div>

      {/* Category Slider */}
      <div className="mt-[24px] mx-[16px] overflow-x-auto flex gap-[8px] snap-x snap-mandatory scrollbar-hide">
        {CATEGORY_DATA.map((category, index) => {
          const isActive = activeCategory === category.label;
          return (
            <div
              key={index}
              onClick={() => setActiveCategory(category.label)}
              className={`cursor-pointer min-w-[calc(33.333%-8px)] snap-start py-[14px] flex justify-center rounded-[10px] items-center ${
                isActive ? "bg-[#2563EB] text-white" : "bg-white text-[#6B7280]"
              }`}
            >
              <img
                src={isActive ? category.activeIcon : category.inactiveIcon}
                alt={category.label}
                className="mr-[8px]"
              />
              <p className="font-semibold">{category.label}</p>
            </div>
          );
        })}
      </div>

      {/* Cars */}
      <div className="flex flex-col items-center mt-[24px] px-[16px]">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <AvailableCarCard key={car.id} car={car} />)
        ) : (
          <div className="text-gray-600 text-center py-10">
            <p className="font-semibold text-lg">
              We do not have a car with these attributes
            </p>
          </div>
        )}
      </div>

      {/* Car Filter Menu */}
      <CarFilterMenu
        isOpen={filterMenuOpen}
        onClose={() => setFilterMenuOpen(false)}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </>
  );
}
