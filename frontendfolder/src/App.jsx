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
import PaymentMethod from "./pages/PaymentMethod";
import AccountSettings from "./pages/AccountSettings";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePassword from "./pages/ChangePassword";
import ChangePhone from "./pages/ChangePhone";
import NotificationPreferences from "./pages/NotificationPreferences"
import LanguageAndRegion from "./pages/LanguageAndRegion";
import Security from "./pages/Security";
import EmailVerification from "./pages/EmailVerification";
import SMSVerification from "./pages/SMSVerification";

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
        <Route path="/payment" element={<PaymentMethod/>} />
        <Route path="/account" element={<AccountSettings/>} />
        <Route path="/change-email" element={<ChangeEmail />} />
<Route path="/change-phone" element={<ChangePhone />} />
<Route path="/change-password" element={<ChangePassword />} />
<Route path="/notification" element={<NotificationPreferences />} />
<Route path="/language&region" element={<LanguageAndRegion />} />
<Route path="/security" element={<Security />} />
<Route path="/verify-email" element={<EmailVerification />} />
<Route path="/verify-sms" element={<SMSVerification />} />

        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;