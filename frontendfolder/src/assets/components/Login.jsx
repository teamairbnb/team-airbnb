import Logo from "./Logo.jsx";
import { useState } from "react";
import Button from "./Button.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log({ email, password });
      alert("Form submitted successfully!");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Logo />

      <div className="flex flex-col w-full max-w-[400px] m3-6 px-4">
        <div className="text-left mb-4">
          <h1 className="font-semibold text-xl">Sign in to your account</h1>
          <p className="text-sm">
            Don't have an account? <span className="text-blue-600">Sign Up</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/xeorjnye"
          method="POST"
          className="flex flex-col gap-4 w-full"
        >

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.email && (
              <p className="text-sm text-red-500 text-right">{errors.email}</p>
            )}
          </div>


          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#717171] outline-none text-[#717171] bg-white rounded-lg w-full p-3"
            />
            {errors.password && (
              <p className="text-sm text-red-500 text-right">{errors.password}</p>
            )}

            <div className="text-right text-blue-600 text-xs mt-1">
              <a href="#">Forgot Password?</a>
            </div>
          </div>

          <div className="mt-5">
            <Button text="Sign in" type="submit" className="w-full max-w-[350px]" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
