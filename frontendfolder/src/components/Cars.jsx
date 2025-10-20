import React, { useState } from "react";
import OwnerCar from "./OwnerCar";
import AddCar from "./AddCar";

export default function Cars() {
  const [showAddCar, setShowAddCar] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);

  return (
    <div className="text-center text-[#111827] mt-10 relative tracking-wide">
      {!showAddCar ? (
        <>
          <p className="text-[20px] font-semibold">Cars</p>

          <button
            onClick={() => setShowAddCar(true)}
            className="py-[10px] px-5 bg-[#2563EB] rounded-xl text-white right-[16px] absolute"
          >
            + Add Car
          </button>

          <div className="mt-20">
            {/* passing showAll flag down */}
            <OwnerCar showAll={showAllCars} />
          </div>

          {/* See All / Show Less */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllCars((s) => !s)}
              className="bg-[#2563EB] text-white px-6 py-2 rounded-xl hover:bg-[#1E40AF] transition"
            >
              {showAllCars ? "Show Less" : "See All"}
            </button>
          </div>
        </>
      ) : (
        <AddCar onBack={() => setShowAddCar(false)} />
      )}
    </div>
  );
}
