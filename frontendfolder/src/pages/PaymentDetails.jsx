import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import back from "../assets/back.svg";
import visaIcon from "../assets/visaIcon.svg";
import mastercardIcon from "../assets/mastercardIcon.svg";
import amexIcon from "../assets/amexIcon.svg";
import applepayIcon from "../assets/applepayIcon.svg";
import { CircleAlert } from "lucide-react";
import { useCarContext } from "../components/FetchCarDetails";

function PaymentDetails() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreeOwnCard, setAgreeOwnCard] = useState(false);
  const [errors, setErrors] = useState({});

  const { car } = useCarContext();
  const location = useLocation();

  const passedTotal = location.state?.derivedCarPrice ?? 0;

  const storedPlanPrice = localStorage.getItem("selectedPlanPrice");
  const planPrice = storedPlanPrice ? parseFloat(storedPlanPrice) : 0;

  const carPrice = car ? parseFloat(car.price) : 0;

  const initialTotal = passedTotal || passedTotal + planPrice;
  const [total, setTotal] = useState(initialTotal);

  useEffect(() => {
    setTotal(passedTotal || carPrice + planPrice);
  }, [passedTotal, carPrice, planPrice]);

  const validate = () => {
    const newErrors = {};

    if (!cardNumber) newErrors.cardNumber = "Card number is required";
    else if (!/^\d{13,19}$/.test(cardNumber.replace(/\s+/g, "")))
      newErrors.cardNumber = "Enter a valid card number";

    if (!cardHolder) newErrors.cardHolder = "Cardholder name is required";

    if (!expiry) newErrors.expiry = "Expiration date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry))
      newErrors.expiry = "Use MM/YY format";

    if (!cvv) newErrors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = "Invalid CVV";

    if (!agreeOwnCard)
      newErrors.agreeOwnCard = "You must confirm you’ll use your own card";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Payment submitted successfully!");
      navigate(`/book/${car.id}/BookingSuccess`);
    }
  };

  return (
    <div className="flex flex-col pt-[16px] min-h-screen">
      <div className="mx-4">
        <Link
          to={car ? `/book/${car.id}/DrivingSecurity` : "/book"}
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black transition"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>
      </div>

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-bold text-xl">Payment Details</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Card Number */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="cardNumber" className="block font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={`border rounded-lg w-full p-3 outline-none ${
                errors.cardNumber
                  ? "border-red-500"
                  : "border-[#D3D3D3] text-[#717171]"
              }`}
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-500 text-right">
                {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="cardHolder" className="block font-medium mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="Name on Card"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className={`border rounded-lg w-full p-3 outline-none ${
                errors.cardHolder
                  ? "border-red-500"
                  : "border-[#D3D3D3] text-[#717171]"
              }`}
            />
            {errors.cardHolder && (
              <p className="text-sm text-red-500 text-right">
                {errors.cardHolder}
              </p>
            )}
          </div>

          {/* Expiry & CVV */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="expiry" className="block font-medium mb-1">
                Expiration Date
              </label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className={`border rounded-lg w-full p-3 outline-none ${
                  errors.expiry
                    ? "border-red-500"
                    : "border-[#D3D3D3] text-[#717171]"
                }`}
              />
              {errors.expiry && (
                <p className="text-sm text-red-500 text-right">
                  {errors.expiry}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="cvv" className="block font-medium mb-1">
                CVV
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className={`border rounded-lg w-full p-3 pr-10 outline-none ${
                    errors.cvv
                      ? "border-red-500"
                      : "border-[#D3D3D3] text-[#717171]"
                  }`}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  title="3 or 4-digit code on the back of your card"
                >
                  <CircleAlert size={16} className="text-gray-500" />
                </div>
              </div>
              {errors.cvv && (
                <p className="text-sm text-red-500 text-right">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-3 mb-4">
            <img src={visaIcon} alt="Visa" className="h-4" />
            <img src={mastercardIcon} alt="Mastercard" className="h-4" />
            <img src={amexIcon} alt="Amex" className="h-4" />
            <img src={applepayIcon} alt="Apple Pay" className="h-4" />
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              id="agreeOwnCard"
              checked={agreeOwnCard}
              onChange={() => setAgreeOwnCard(!agreeOwnCard)}
              className="mt-1"
            />
            <label
              htmlFor="agreeOwnCard"
              className="text-sm text-[#717171] leading-snug"
            >
              I’ll use a payment method in my own name and present it at pickup.
              I understand debit cards may only work for certain vehicles and
              might need extra documents.
            </label>
          </div>
          {errors.agreeOwnCard && (
            <p className="text-sm text-red-500 text-right">
              {errors.agreeOwnCard}
            </p>
          )}

          {/* Total */}
          <div className="flex justify-between mt-6 border-t pt-4">
            <div>
              <p className="text-xl font-bold">Total</p>
              <p className="underline text-sm text-[#717171]">Price details</p>
            </div>
            <div>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full mb-4 mt-7 py-4 rounded-xl font-semibold text-lg text-center transition bg-blue-600 text-white hover:bg-blue-700"
          >
            Pay & Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentDetails;
