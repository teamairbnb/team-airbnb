import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import "./index.css";
import Onboarding from './pages/Onboarding'
import CodeVerification from "./pages/CodeVerification";
import VerificationSuccess from "./pages/VerificationSuccess";
import CustomerHomePage from "./pages/CustomerHomePage";
import Login from './pages/Login'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/CustomerHomePage" element={<CustomerHomePage />} />
        <Route path="/CodeVerification" element={<CodeVerification />} />
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
