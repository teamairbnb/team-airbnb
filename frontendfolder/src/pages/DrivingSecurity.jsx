import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import DrivingSecurityCard from "../components/DrivingSecurityCard";
import greensafeguard from "../assets/greensafeguard.svg";
import graysafeguard from "../assets/graysafeguard.svg";
import zerosecurity from "../assets/zerosecurity.svg";
import { useCarContext } from "../components/FetchCarDetails";

export default function DrivingSecurity() {
  const { car } = useCarContext();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const cards = [
    {
      title: "Peace of mind",
      description: "No deduction - no claim, no hassle",
      img: greensafeguard,
      features: [
        "100% coverage for car damage & theft",
        "$300K liability protection for bodily injury or property damage to others",
        "Medical coverage for you & passengers",
        "Belongings coverage for you, family & additional drivers",
      ],
      price: 50.44,
    },
    {
      title: "Cover The Car & Liability",
      description: "No deduction - no claim, no hassle",
      img: greensafeguard,
      features: [
        "100% coverage for car damage & theft",
        "$300K liability protection for bodily injury or property damage to others",
      ],
      price: 20.87,
    },
    {
      title: "Cover The Car",
      description: "No deduction - no claim, no hassle",
      img: graysafeguard,
      features: ["100% coverage for car damage & theft"],
      price: 5.87,
    },
    {
      title: "I'll take the risk (No extra protection)",
      img: zerosecurity,
      description:
        "You may be charged up to the full vehicle value in case of damage or theft.",
    },
  ];

  useEffect(() => {
    const storedPlanPrice = localStorage.getItem("selectedPlanPrice");
    if (storedPlanPrice !== null) {
      const price = parseFloat(storedPlanPrice);
      const storedPlan = cards.find((card) => (card.price ?? 0) === price);
      if (storedPlan) {
        setSelectedPlan(storedPlan);
        setSelectedPlanPrice(price);
      }
    }
  }, []);

  const handlePlanSelect = (plan) => {
    setUserInteracted(true);

    if (selectedPlan === plan) {
      setSelectedPlan(null);
      setSelectedPlanPrice(0);
      localStorage.removeItem("selectedPlanPrice");
    } else {
      setSelectedPlan(plan);
      const planPrice = plan.price ?? 0;
      setSelectedPlanPrice(planPrice);
      localStorage.setItem("selectedPlanPrice", planPrice);
    }
  };

  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        <Link
          to={car ? `/book/${car.id}/ReviewBooking` : "/book"}
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black transition"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Driving security</p>

        <p className="text-[#6B7280] mt-2 text-[12px] leading-relaxed">
          Without protection, you’re liable for up to the full value of the car
          in case of damage or theft. Compare your options and choose the right
          one for you.
        </p>

        <div className="mt-[23px] flex flex-col gap-4">
          {cards.map((card, index) => (
            <div key={index} onClick={() => handlePlanSelect(card)}>
              <DrivingSecurityCard
                {...card}
                isSelected={selectedPlan === card}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        {userInteracted && selectedPlan && car ? (
          <Link
            to={`/book/${car.id}/PaymentDetails`}
            state={{ derivedCarPrice: car.price + selectedPlanPrice }}
            className="block w-full mb-4 py-4 rounded-xl font-semibold text-lg text-center bg-blue-600 text-white transition cursor-pointer"
          >
            Next
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="block w-full mb-4 py-4 rounded-xl font-semibold text-lg text-center bg-gray-400 text-white cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
