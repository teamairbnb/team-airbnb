import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import "./index.css";
import CodeVerification from "./pages/CodeVerification";
import VerificationSuccess from "./pages/VerificationSuccess";
import CustomerHomePage from "./pages/CustomerHomePage";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CodeVerification />} />
        <Route path="/VerificationSuccess" element={<VerificationSuccess />} />
        <Route path="/CustomerHomePage" element={<CustomerHomePage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
