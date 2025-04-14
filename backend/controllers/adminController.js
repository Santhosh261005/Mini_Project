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

// Get Orphanage Details
exports.getOrphanageDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const orphanageDetails = {
      orphanageName: admin.orphanageName,
      address: admin.address,
      phone: admin.phone,
      email: admin.email,
      website: admin.website,
      staffCount: admin.staffCount,
      director: admin.director,
      mission: admin.mission,
      needs: admin.needs,
      accreditation: admin.accreditation
    };

    res.status(200).json(orphanageDetails);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update Orphanage Details
exports.updateOrphanageDetails = async (req, res) => {
  try {
    const {
      orphanageName,
      address,
      phone,
      email,
      website,
      staffCount,
      director,
      mission,
      needs,
      accreditation
    } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.adminId,
      {
        orphanageName,
        address,
        phone,
        email,
        website,
        staffCount,
        director,
        mission,
        needs,
        accreditation
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    res.status(200).json({ msg: "Orphanage details updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
