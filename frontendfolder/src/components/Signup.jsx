import Logo from "./Logo.jsx";
import { useState } from "react";
import Button from "./Button.jsx";

function Signup() {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!businessName) newErrors.businessName = "Business name is required";
    if (!ownerName) newErrors.ownerName = "Owner name is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    if (!rePassword) newErrors.rePassword = "Please re-enter your password";
    if (password && rePassword && password !== rePassword)
      newErrors.rePassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ businessName, ownerName, email, phone, password });
      alert("Signup submitted successfully!");
      

      setBusinessName("");
      setOwnerName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRePassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Logo />

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-semibold text-xl">Create your account</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          {/* Business Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="businessName" className="block mb-2">Business Name</label>
            <input
              type="text"
              id="businessName"
              placeholder="Enter Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.businessName && (
              <p className="text-sm text-red-500 text-right">{errors.businessName}</p>
            )}
          </div>

          {/* Owner Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="ownerName" className="block mb-2">Owner Name</label>
            <input
              type="text"
              id="ownerName"
              placeholder="Enter Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.ownerName && (
              <p className="text-sm text-red-500 text-right">{errors.ownerName}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.email && (
              <p className="text-sm text-red-500 text-right">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="phone" className="block mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 text-right">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.password && (
              <p className="text-sm text-red-500 text-right">{errors.password}</p>
            )}
          </div>

          {/* Re-enter Password */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="rePassword" className="block mb-2">Re-enter Password</label>
            <input
              type="password"
              id="rePassword"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.rePassword && (
              <p className="text-sm text-red-500 text-right">{errors.rePassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-5 mb-16">
            <Button text="Sign Up" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
