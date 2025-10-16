import React, { useState } from "react";
import OwnerCar from "./OwnerCar";
import AddCar from "./AddCar"; // ← this is the component you want to show when Add Car is clicked

export default function Cars() {
  const [showAddCar, setShowAddCar] = useState(false);

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
            <OwnerCar />
            <OwnerCar />
            <OwnerCar />
          </div>
        </>
      ) : (
        <AddCar onBack={() => setShowAddCar(false)} />
      )}
    </div>
  );
}
