import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import cancelbookingwarning from "../assets/cancelbookingwarning.svg";
import close from "../assets/close.svg";
import NavBar from "../components/NavBar";

export default function UserProfile() {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Personal info", path: "/CustomerPersonalInfo" },
    { title: "Driver's license", path: "/DriverLicense" },
    { title: "Saved Payment Methods", path: "/PaymentMethod" },
    { title: "Account Settings", path: "/profile/account-settings" },
    { title: "Notifications Preferences", path: "/CustomerNotif" },
    { title: "Security", path: "/Security" },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleCancelClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Fixed Top Navbar */}
      <div className="w-full bg-white">
        <div className="pt-4 pb-10">
          <NavBar />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Profile Section */}
        <div className="px-4 flex flex-col items-center mb-6">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Rodie Jones
          </h2>
          <div className="text-gray-400 text-sm">@roro</div>
        </div>

        {/* Menu Items */}
        <div className="px-4 space-y-5">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl border border-[#D3D3D3] hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900 text-sm font-normal">
                {item.title}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-4 border-t border-gray-200">
        <button
          onClick={handleCancelClick}
          className="w-full text-red-500 text-sm font-medium hover:text-red-600 transition-colors py-3"
        >
          Log out
        </button>
      </div>

      {/* Log Out Modal */}
      {showModal && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal Box */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[92%] max-w-[400px] p-6 text-center">
              <div className="flex justify-between">
                <div></div>
                <img
                  onClick={handleCloseModal}
                  className="w-[24px] mb-2 cursor-pointer"
                  src={close}
                  alt="Close"
                />
              </div>
              <h2 className="font-bold text-[25px] mb-3">Log Out?</h2>
              <p className="text-[#6B7280] text-sm mb-6">
                Are you sure you want to log out?
              </p>

              <div className="flex justify-center mb-6">
                <img src={cancelbookingwarning} alt="Warning" />
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    handleCloseModal();
                    alert("See you soon.");
                  }}
                  className="w-full py-4 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                >
                  Log Out
                </button>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-4 border border-[#D3D3D3] rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
