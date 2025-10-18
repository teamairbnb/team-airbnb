import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";

function ChangePhone() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Phone number changed to: ${phone}`);
  };

  return (
    <div className="flex flex-col  w-full  bg-gray-50">
      <Header title="Profile/Account Settings" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[400px] mt-8 px-4 gap-4"
      >
        <label className="font-medium">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter new phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-[#717171] bg-white rounded-lg p-3 outline-none"
        />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
  <Button text="Confirm" type="submit" className="w-full" />
</div>

      </form>
    </div>
  );
}

export default ChangePhone;
