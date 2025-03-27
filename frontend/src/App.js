import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DonateNow from "./pages/DonateNow.js"; // Or `./pages/DonateNow.js` if you rename the file
import Chatbot from "./pages/Chatbot";
import Rewards from "./pages/Rewards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css"; // Ensure the CSS is imported

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate" element={<DonateNow />} /> {/* Use DonateNow */}
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;