import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

function ChangeEmail() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email changed to: ${email}`);
  };

  return (
    <div className="flex flex-col  w-full  bg-gray-50">
      <div className="relative flex items-center justify-center my-6 mx-4">
        <Link to="/AccountSettings" className="absolute left-0">
          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        </Link>

        <p className="font-semibold text-[#11182773]">
          Profile / <span className="text-[#111827]">Account Settings</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[400px] mt-8 px-4 gap-4"
      >
        <label className="font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter new email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-[#717171] bg-white rounded-lg p-3 outline-none"
        />
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
          <Button text="Confirm" type="submit" className="w-full" />
        </div>
      </form>
    </div>
  );
}

export default ChangeEmail;
