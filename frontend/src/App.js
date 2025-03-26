import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DonateNow from "./pages/DonateNow";
import Chatbot from "./pages/Chatbot";
import Rewards from "./pages/Rewards";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate-now" element={<DonateNow />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  );
};

export default App;
