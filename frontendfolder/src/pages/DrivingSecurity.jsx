import React from "react";
import { Link } from "react-router-dom";
import back from "../assets/back.svg";
import DrivingSecurityCard from "../components/DrivingSecurityCard";
import greensafeguard from "../assets/greensafeguard.svg";
import graysafeguard from "../assets/graysafeguard.svg";
import zerosecurity from "../assets/zerosecurity.svg";

export default function DrivingSecurity() {
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

  return (
    <div className="p-[16px] text-[#111827] tracking-wide min-h-screen flex flex-col justify-between">
      <div>
        <Link
          to="/ReviewBooking"
          className="inline-flex items-center gap-2 text-gray-600 py-[13px] pl-[16.5px] pr-[10px] rounded-[10px] bg-[#D3D3D399] hover:text-black"
        >
          <img className="w-4" src={back} alt="Back" />
        </Link>

        <p className="font-bold mt-[20px] text-[25px]">Driving security</p>

        <p className="text-[#6B7280] mt-2 text-[12px]">
          Without protection, you’re liable for up to the full value the car
          vehicle in case of damage or theft. Compare your options and choose
          the right one for you.
        </p>

        <div className="mt-[23px] flex flex-col gap-4">
          {cards.map((card, index) => (
            <DrivingSecurityCard key={index} {...card} />
          ))}
        </div>
      </div>

      <Link
        to="/DrivingSecurity"
        className="block w-full mb-4 mt-7 bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition"
      >
        Next
      </Link>
    </div>
  );
}
