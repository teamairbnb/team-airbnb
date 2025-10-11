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
import PaymentDetails from "./pages/PaymentDetails";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import NoBookings from "./pages/NoBookings";
import PickUp from "./pages/PickUp";
import ReviewBooking from "./pages/ReviewBooking";
import DrivingSecurity from "./pages/DrivingSecurity";
import UserProfile from "./pages/UserProfile";
import FetchCarDetails from "./components/FetchCarDetails";

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

        <Route path="/book/:carId" element={<FetchCarDetails />}>
          <Route path="/book/:carId/car-booking" element={<CarBookingScreen />} />
          <Route path="/book/:carId/PickUp" element={<PickUp />} />
          <Route path="/book/:carId/ReviewBooking" element={<ReviewBooking />} />
          <Route path="/book/:carId/DrivingSecurity" element={<DrivingSecurity />} />
          <Route path="/book/:carId/PaymentDetails" element={<PaymentDetails />} />
          <Route path="/book/:carId/BookingSuccess" element={<BookingSuccess />} />
        </Route>

        <Route path="/NoBookings" element={<NoBookings />} />
        <Route path="/MyBookings" element={<MyBookings />} />
        <Route path="/UserProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
