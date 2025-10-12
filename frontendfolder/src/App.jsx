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
import PickUp from "./pages/PickUp";
import ReviewBooking from "./pages/ReviewBooking";
import DrivingSecurity from "./pages/DrivingSecurity";
import BookingDetails from "./pages/BookingDetails";
import BusinessOwnerDashboard from "./pages/BusinessOwnerDashboard";
import Cars from "./components/Cars";
import UserProfile from "./pages/UserProfile";
import CustomerPersonalInfo from "./pages/CustomerPersonalInfo";
import DriverLicense from "./pages/DriverLicense";
import PaymentMethod from "./pages/PaymentMethod";
import AddCard from "./pages/AddCard";

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
        <Route path="/PickUp" element={<PickUp />} />
        <Route path="/ReviewBooking" element={<ReviewBooking />} />
        <Route path="/DrivingSecurity" element={<DrivingSecurity />} />
        <Route path="/BookingDetails" element={<BookingDetails />} />
        <Route path="/BusinessOwnerDashboard" element={<BusinessOwnerDashboard />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/CustomerPersonalInfo" element={<CustomerPersonalInfo />} />
        <Route path="/DriverLicense" element={<DriverLicense />} />
        <Route path="/PaymentMethod" element={<PaymentMethod />} />
        <Route path="/AddCard" element={<AddCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;