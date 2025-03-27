import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DonateNow from "./pages/DonateNow";
import Chatbot from "./pages/Chatbot";
import Rewards from "./pages/Rewards";
import Login from "./pages/Login"; // Import Login page
import Signup from "./pages/Signup"; // Import Signup page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate" element={<DonateNow />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/login" element={<Login />} /> {/* Added Login Route */}
          <Route path="/signup" element={<Signup />} /> {/* Added Signup Route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
