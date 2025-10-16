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
import BookingDetails from "./pages/BookingDetails";
import BusinessOwnerDashboard from "./pages/BusinessOwnerDashboard";
import Cars from "./components/Cars";
import UserProfile from "./pages/UserProfile";
import CustomerPersonalInfo from "./pages/CustomerPersonalInfo";
import DriverLicense from "./pages/DriverLicense";
import PaymentMethod from "./pages/PaymentMethod";
import AddCard from "./pages/AddCard";
import FetchCarDetails from "./components/FetchCarDetails";
import Security from "./pages/Security";
import ChangePassword from "./pages/ChangePassword";
import EditCarDetails from "./components/EditCarDetails";
import ScrollToTop from "./components/ScrollToTop";
// import Signup from "./pages/UserSignup";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/CodeVerification" element={<CodeVerification />} />
        <Route path="/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/CustomerHomePage" element={<CustomerHomePage />} />

        <Route path="/book/:carId" element={<FetchCarDetails />}>
          <Route
            path="/book/:carId/car-booking"
            element={<CarBookingScreen />}
          />
          <Route path="/book/:carId/PickUp" element={<PickUp />} />
          <Route
            path="/book/:carId/ReviewBooking"
            element={<ReviewBooking />}
          />
          <Route
            path="/book/:carId/DrivingSecurity"
            element={<DrivingSecurity />}
          />
          <Route
            path="/book/:carId/PaymentDetails"
            element={<PaymentDetails />}
          />
          <Route
            path="/book/:carId/BookingSuccess"
            element={<BookingSuccess />}
          />
          <Route
            path="/book/:carId/BookingDetails"
            element={<BookingDetails />}
          />
        </Route>

        <Route
          path="/BusinessOwnerDashboard"
          element={<BusinessOwnerDashboard />}
        />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/NoBookings" element={<NoBookings />} />
        <Route path="/MyBookings" element={<MyBookings />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route
          path="/CustomerPersonalInfo"
          element={<CustomerPersonalInfo />}
        />
        <Route path="/DriverLicense" element={<DriverLicense />} />
        <Route path="/PaymentMethod" element={<PaymentMethod />} />
        <Route path="/AddCard" element={<AddCard />} />
        <Route path="/Security" element={<Security />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/EditCarDetails" element={<EditCarDetails />} />
        <Route path="/UserSignup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
