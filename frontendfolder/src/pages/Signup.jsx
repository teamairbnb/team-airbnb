import Logo from "../components/Logo.jsx";
import { useState } from "react";
import Button from "../components/Button.jsx";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = "Username is required";
    else if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";

    if (!email) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";
    }

    if (!phone) newErrors.phone = "Phone number is required";
    else {
      const phoneRegex = /^\+?\d{10,15}$/;
      if (!phoneRegex.test(phone))
        newErrors.phone = "Enter a valid phone number (10–15 digits)";
    }

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!rePassword) newErrors.rePassword = "Please re-enter your password";
    if (password && rePassword && password !== rePassword)
      newErrors.rePassword = "Passwords do not match";

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
        email: email.trim().toLowerCase(),
        password: password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone_number: phone.trim(),
        country: "Nigeria",
        state: "Rivers",
        address: "N/A",
      };

      console.log("Sending request body:", requestBody);

      try {
        const response = await fetch(
          "https://team-airbnb.onrender.com/api/v1/auth/users/",
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
          console.log("Signup successful:", data);
          alert("Signup submitted successfully!");

          const userInfo = {
            username: data.username || username,
            first_name: data.first_name || firstName,
            last_name: data.last_name || lastName,
            email: data.email || email,
            phone_number: data.phone_number || phone,
          };
          localStorage.setItem("user_info", JSON.stringify(userInfo));

          // Reset form
          setUsername("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setRePassword("");

          window.location.href = "/Login";
        } else {
          console.error("Signup failed:", data);
          let errorMessage = "Please try again";

          if (typeof data === "string") errorMessage = data;
          else if (data.message) errorMessage = data.message;
          else if (data.error) errorMessage = data.error;
          else if (Array.isArray(data) && data.length > 0)
            errorMessage = data[0];

          alert(`Signup failed: ${errorMessage}`);
          if (data.errors) setErrors(data.errors);
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
              <p className="text-sm text-red-500 text-right">{errors.username}</p>
            )}
          </div>

          {/* First Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="firstName" className="block mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 text-right">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lastName" className="block mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 text-right">{errors.lastName}</p>
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
              <p className="text-sm text-red-500 text-right">{errors.password}</p>
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
              <p className="text-sm text-red-500 text-right">{errors.rePassword}</p>
            )}
          </div>

          <div className="mt-5 mb-16">
            <Button
              text={isLoading ? "Signing Up..." : "Sign Up"}
              type="submit"
              className="w-full max-w-[350px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
