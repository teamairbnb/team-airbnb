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
import Header from "./components/Header";
import BusinessInfo from "./pages/BusinessInfo";
import BusinessProfile from "./pages/BusinessProfile";
import UploadImage from "./pages/UploadImage";
import BusinessPayment from "./pages/BusinessPayment";

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
        <Route path="/header" element={<Header />} />
        <Route path="/business-info" element={<BusinessInfo />} />
        <Route path="/business-profile" element={<BusinessProfile />} />
        <Route path="/upload" element={<UploadImage/>} />
        <Route path="/payment" element={<BusinessPayment/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;