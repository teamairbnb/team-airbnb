import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // get token
      const token =
        window.accessToken || localStorage.getItem("accessToken");

      if (!token) {
        setMessage("You are not logged in.");
        setLoading(false);
        return;
      }

      // send API request
      const res = await axios.put(
        "https://team-airbnb.onrender.com/api/v1/app/profile/change-password/",
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // handle success
      setMessage(res.data.detail || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // navigate back after success
      setTimeout(() => navigate("/Security"), 2000);
    } catch (err) {
      // error handling
      if (err.response) {
        setMessage(err.response.data.detail || "Failed to change password.");
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative tracking-wide">
      <Link to="/Security">
        <button className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      </Link>

      <p className="font-semibold text-[22px]">Change Password</p>

      <div className="mt-[30px]">
        {/* Current Password */}
        <div className="flex flex-col gap-1 w-full">
          <label className="block font-medium mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1 w-full my-5">
          <label className="block font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1 w-full">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-[#D3D3D3] rounded-lg w-full p-4 outline-none"
          />
        </div>
      </div>

      {/* Feedback Message */}
      {message && (
        <p className="text-center text-sm text-red-500 mt-4">{message}</p>
      )}

      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg text-center hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save password"}
        </button>
      </div>
    </div>
  );
}
