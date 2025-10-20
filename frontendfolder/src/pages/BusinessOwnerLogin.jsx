import Logo from "../components/Logo.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

function BusinessOwnerLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      const requestBody = {
        username: username.trim(),
        password: password,
      };

      console.log("Sending login request:", requestBody);

      try {
        const response = await fetch(
          "https://team-airbnb.onrender.com/api/v1/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        console.log("Full API Response:", response.status, data);

        if (response.ok) {
          console.log("Login successful:", data);

          // Store tokens in localStorage
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("username", username);

          alert("Login successful!");

          // Reset form fields
          setUsername("");
          setPassword("");

          // Redirect to BusinessOwnerDashboard
          navigate("/BusinessOwnerDashboard");
        } else {
          // Handle API errors
          console.error("Login failed:", data);

          let errorMessage = "Invalid credentials. Please try again.";
          if (typeof data === "string") {
            errorMessage = data;
          } else if (data.detail) {
            errorMessage = data.detail;
          } else if (data.message) {
            errorMessage = data.message;
          } else if (Array.isArray(data) && data.length > 0) {
            errorMessage = data[0];
          }

          alert(`Login failed: ${errorMessage}`);

          // Set field-specific errors if provided by API
          if (data.errors) {
            setErrors(data.errors);
          }
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Logo />

      <div className="flex flex-col w-full max-w-[400px] mt-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-semibold text-xl">Sign in to your account</h1>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline font-medium"
              onClick={() => navigate("/BusinessOwnerSignup")}
            >
              Sign Up
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.username && (
              <p className="text-sm text-red-500 text-right">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password && (
              <p className="text-sm text-red-500 text-right">
                {errors.password}
              </p>
            )}

            <div className="text-right text-blue-600 text-xs mt-1">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="mt-5 mb-8">
            <Button
              text={isLoading ? "Signing in..." : "Sign in"}
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

export default BusinessOwnerLogin;
