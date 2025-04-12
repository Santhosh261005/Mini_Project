const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express(); // Initialize Express

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Enable JSON parsing



// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/routes/auth", authRoutes); // Authentication routes

const userRoutes = require("./routes/user");
app.use("/routes/user", userRoutes);

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
// Use Routes
app.use("/routes/admin", adminRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
