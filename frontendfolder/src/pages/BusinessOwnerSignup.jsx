import Logo from "../components/Logo.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";

function BusinessOwnerSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Username check
    if (!username) newErrors.username = "Username is required";

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // Phone check
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else {
      // phone number validation
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.phone = "Enter a valid phone number (10–15 digits)";
      }
    }

    // Password check
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const hasMinLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (
        !hasMinLength ||
        !hasUppercase ||
        !hasLowercase ||
        !hasNumber ||
        !hasSymbol
      ) {
        newErrors.password =
          "Password must contain at least 8 characters, uppercase, lowercase, number, symbols";
      }
    }

    if (!rePassword) {
      newErrors.rePassword = "Please re-enter your password";
    } else if (password && rePassword && password !== rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://team-airbnb.onrender.com/api/v1/app/business-owner",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
              phone_number: phone,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Success - redirect to login
          alert("Signup successful! Please login.");
          window.location.href = "/BusinessOwnerLogin";
        } else {
          // Handle error response
          setErrors({
            submit: data.message || "Signup failed. Please try again.",
          });
        }
      } catch (error) {
        setErrors({
          submit: "Network error. Please check your connection and try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Logo />

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-semibold text-xl">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.username && (
              <p className="text-sm text-red-500 text-right">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
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
            <label htmlFor="phone" className="block mb-2">
              Phone Number
            </label>
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
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.password && (
              <p className="text-sm text-red-500 text-right">
                {errors.password}
              </p>
            )}
          </div>

          {/* Re-enter Password */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="rePassword" className="block mb-2">
              Re-enter Password
            </label>
            <input
              type="password"
              id="rePassword"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.rePassword && (
              <p className="text-sm text-red-500 text-right">
                {errors.rePassword}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-sm text-red-500 text-center">{errors.submit}</p>
          )}

          <div className="mt-5 mb-16">
            <Button
              text={isLoading ? "Signing Up..." : "Sign Up"}
              type="submit"
              className="w-full max-w-[350px]"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default BusinessOwnerSignup;
