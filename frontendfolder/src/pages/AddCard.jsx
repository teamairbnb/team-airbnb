import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import americanexpress from "../assets/americanexpress.svg";
import visa from "../assets/visa.svg";
import mastercard from "../assets/mastercard.svg";
import applepay from "../assets/applepay.svg";

export default function AddCard() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!cardholderName.trim())
      newErrors.cardholderName = "Cardholder name is required";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
      newErrors.expiry = "Enter expiry as MM/YY";
    if (!/^\d{3,4}$/.test(cvv))
      newErrors.cvv = "CVV must be 3 or 4 digits";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Card added successfully!");
      navigate("/PaymentMethod");
    }
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative tracking-wide">
      <Link to="/PaymentMethod">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <div>
        <p className="font-semibold text-[22px]">Payment Details</p>

        <div className="px-[5px] mt-8">
          <div>
            <p className="font-semibold">Card Number</p>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              className={`w-full rounded-[8px] mt-3 py-[14px] px-[16px] border ${
                errors.cardNumber ? "border-red-500" : "border-[#D3D3D3]"
              } focus:border-[#2563EB] outline-none transition`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-[13px] mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="mt-5">
            <p className="font-semibold">Cardholder Name</p>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className={`w-full rounded-[8px] mt-3 py-[14px] px-[16px] border ${
                errors.cardholderName ? "border-red-500" : "border-[#D3D3D3]"
              } focus:border-[#2563EB] outline-none transition`}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-[13px] mt-1">
                {errors.cardholderName}
              </p>
            )}
          </div>

          <div className="flex mt-5 gap-4">
            <div className="w-full">
              <p className="font-semibold">Expiration Date</p>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength="5"
                className={`w-full rounded-[8px] mt-3 py-[14px] px-[16px] border ${
                  errors.expiry ? "border-red-500" : "border-[#D3D3D3]"
                } focus:border-[#2563EB] outline-none transition`}
              />
              {errors.expiry && (
                <p className="text-red-500 text-[13px] mt-1">{errors.expiry}</p>
              )}
            </div>

            <div className="w-full">
              <p className="font-semibold">CVV</p>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="4"
                className={`w-full rounded-[8px] mt-3 py-[14px] px-[16px] border ${
                  errors.cvv ? "border-red-500" : "border-[#D3D3D3]"
                } focus:border-[#2563EB] outline-none transition`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-[13px] mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-4 gap-[9px] mx-[5px]">
          <img src={americanexpress} alt="" />
          <img src={visa} alt="" />
          <img src={mastercard} alt="" />
          <img src={applepay} alt="" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
        >
          Add card
        </button>
      </div>
    </div>
  );
}
