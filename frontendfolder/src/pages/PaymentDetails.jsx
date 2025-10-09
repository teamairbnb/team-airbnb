import React, { useState } from "react";
import Logo from "../components/Logo.jsx";
import Button from "../components/Button.jsx";
import visaIcon from "../assets/visaIcon.svg";
import mastercardIcon from "../assets/mastercardIcon.svg";
import amexIcon from "../assets/amexIcon.svg";
import applepayIcon from "../assets/applepayIcon.svg";
import { CircleAlert } from "lucide-react";
import Slider from "../components/Slider.jsx";

function PaymentDetails() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreeOwnCard, setAgreeOwnCard] = useState(false);
  const [errors, setErrors] = useState({});

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
      console.log({ cardNumber, cardHolder, expiry, cvv });
      alert("Payment submitted successfully!");
      window.location.href = "/BookingConfirmation";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">

        <Slider />

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-bold text-xl">Payment Details</h1>
        </div>



        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Card Number */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="cardNumber" className="block font-normal mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-500 text-right">
                {errors.cardNumber}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="cardHolder" className="block mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="Name on Card"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.cardHolder && (
              <p className="text-sm text-red-500 text-right">
                {errors.cardHolder}
              </p>
            )}
          </div>

          {/* Sensitive info */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="expiry" className="block mb-1">
                Expiration Date
              </label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
              />
              {errors.expiry && (
                <p className="text-sm text-red-500 text-right">
                  {errors.expiry}
                </p>
              )}
            </div>

        

            
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="cvv" className="block mb-1">
                CVV
              </label>

              <div className="relative">
                <input
                  type="password"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3 pr-10"
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
          {/*I made a minor tweak to this by adding a checkbox instead of the radio and made the links blue instead of black*/}
          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              id="agreeOwnCard"
              checked={agreeOwnCard}
              onChange={() => setAgreeOwnCard(!agreeOwnCard)}
              className="mt-1"
            />
            <label htmlFor="agreeOwnCard" className="text-sm text-[#717171] leading-snug">
              I’ll use a payment method in my own name and present it at pickup. I
              understand debit cards may only work for certain vehicles and might need
              extra documents.
            </label>
          </div>
          {errors.agreeOwnCard && (
            <p className="text-sm text-red-500 text-right">{errors.agreeOwnCard}</p>
          )}

   
          <p className="text-xs text-[#717171] mt-2 leading-snug">
            By booking, I agree to the {" "}
            <a href="#" className="text-blue-600 underline">
              Rental Information
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 underline">
              Terms and Conditions
            </a>
            , and{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            , and I accept that this is a prepaid rate charged right away. I’m also
            aware that age, payment, and location restrictions may apply.
          </p>

<div className="flex gap-32">
    <div className="flex-col">
        <p className="text-xl font-bold">Total</p>
        <p className="underline text-sm text-[#717171]">Price details</p>
    </div>
    <div>
        <p className="text-xl font-bold">$499.60</p>
    </div>
</div>

          <div className="mt-6 mb-16">
            <Button text="Pay & Book" type="submit" className="w-full max-w-[350px]" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentDetails;
