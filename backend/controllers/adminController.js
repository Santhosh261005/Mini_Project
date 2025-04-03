const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Admin Signup Controller
exports.adminSignup = async (req, res) => {
  try {
    const { ownerName, ngoLocation, childrenCount, middleAgeCount, olderCount, establishmentYear, ownerEmail, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ ownerEmail });
    if (admin) {
      return res.status(400).json({ msg: "Admin already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save admin to DB
    admin = new Admin({
      ownerName,
      ngoLocation,
      childrenCount,
      middleAgeCount,
      olderCount,
      establishmentYear,
      ownerEmail,
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Admin Login Controller
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ ownerEmail: email });
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
