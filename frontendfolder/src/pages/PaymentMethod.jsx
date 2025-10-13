import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import visa from "../assets/visa.svg";
import mastercard from "../assets/mastercard.svg";
import SavedCard from "../components/SavedCard";

export default function PaymentMethod() {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(
    localStorage.getItem("selectedCard") || "visa"
  );

  const [tempSelection, setTempSelection] = useState(selectedCard);

  const handleSave = () => {
    localStorage.setItem("selectedCard", tempSelection);
    setSelectedCard(tempSelection);
    alert("Payment method saved successfully!");
    navigate("/UserProfile");
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative">
      <Link to="/UserProfile">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <div>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[22px]">Payment Method</p>
          <Link to="/AddCard">
            <button className="border border-[#2563EB] py-[9px] px-7 rounded-[10px] text-[#2563EB]">
              + add card
            </button>
          </Link>
        </div>

        <SavedCard
          value="visa"
          img={visa}
          tempSelection={tempSelection}
          setTempSelection={setTempSelection}
          cardNum="1222 **** 1234"
        />

        <SavedCard
          value="mastercard"
          img={mastercard}
          tempSelection={tempSelection}
          setTempSelection={setTempSelection}
          cardNum="1222 **** 1234"
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
