import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";

function BusinessOwnerChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password changed successfully!");
  };

  return (
    <div className="flex flex-col  w-full  bg-gray-50">
      <Header title="Profile" subtitle="Change Password" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[400px] mt-8 px-4 gap-4"
      >
        <label className="font-medium">Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border border-[#717171] bg-white rounded-lg p-3 outline-none"
        />

        <label className="font-medium">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-[#717171] bg-white rounded-lg p-3 outline-none"
        />

        <label className="font-medium">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-[#717171] bg-white rounded-lg p-3 outline-none"
        />

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-inner">
  <Button text="Confirm" type="submit" className="w-full" />
</div>

      </form>
    </div>
  );
}

export default BusinessOwnerChangePassword;
