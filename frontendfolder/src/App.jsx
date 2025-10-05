import React from "react";
import "./App.css";
import "./index.css";
import CarBookingScreen from "./components/carDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import CodeVerification from "./pages/CodeVerification";
import VerificationSuccess from "./pages/VerificationSuccess";
import CustomerHomePage from "./pages/CustomerHomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/CodeVerification" element={<CodeVerification />} />
        <Route path="/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/CustomerHomePage" element={<CustomerHomePage />} />
        <Route path="/car-booking" element={<CarBookingScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;