const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); // Load environment variables
const path = require('path');


const app = express(); // Initialize Express

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
}));
app.use(express.json()); // Enable JSON parsing

setup: app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => res.send("API Running"));
app.get("/test-route", (req, res) => res.send("Test route working"));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
