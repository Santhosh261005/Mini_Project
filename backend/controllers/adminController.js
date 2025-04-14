const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Admin Signup Controller
exports.adminSignup = async (req, res) => {
  try {
    console.log("Admin Signup Request Body:", req.body);
    const { orphanageName, ownerName, ngoLocation, childrenCount, middleAgeCount, olderCount, establishmentYear, ownerEmail, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ ownerEmail });
    if (admin) {
      return res.status(400).json({ msg: "Admin already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save admin to DB
    console.log("orphanageName value before save:", orphanageName);
    admin = new Admin({
      orphanageName,
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
    console.error("Admin login error:", error); // Added detailed error logging
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get Orphanage Details
exports.getOrphanageDetails = async (req, res) => {
  try {
    const adminId = req.adminId || (req.user && req.user.adminId);
    if (!adminId) {
      return res.status(401).json({ msg: "Admin ID not found in request" });
    }
    const admin = await Admin.findById(adminId);
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

// Post Requirements
exports.postRequirements = async (req, res) => {
  try {
    const { adminName, requirements } = req.body;
    console.log('Received requirements:', requirements); // Log incoming data

    // Validate input
    if (!adminName || !requirements) {
      return res.status(400).json({ 
        success: false,
        msg: "Admin name and requirements are required"
      });
    }

    if (!Array.isArray(requirements)) {
      return res.status(400).json({ 
        success: false,
        msg: "Requirements must be an array"
      });
    }

    // Validate each requirement
    const validRequirements = requirements.filter(req => 
      req.id && req.name && !isNaN(req.quantity) && req.quantity >= 0
    );

    if (validRequirements.length === 0) {
      return res.status(400).json({ 
        success: false,
        msg: "No valid requirements provided"
      });
    }

    // Save to database
    const adminId = req.adminId || (req.user && req.user.adminId);
    if (!adminId) {
      return res.status(401).json({ msg: "Admin ID not found in request" });
    }

    // Find the admin and update their requirements
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      {
        requirements: validRequirements.map(req => ({
          name: req.name,
          quantity: req.quantity,
          priority: req.priority || 'medium',
          notes: req.notes || ''
        }))
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    console.log('Successfully saved requirements');

    res.status(200).json({ 
      success: true,
      msg: "Requirements posted successfully!",
      data: updatedAdmin.requirements // Return the updated requirements
    });
  } catch (error) {
    console.error('Error posting requirements:', error);
    res.status(500).json({ 
      success: false,
      msg: "Failed to save requirements",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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

    const adminId = req.adminId || (req.user && req.user.adminId);
    if (!adminId) {
      return res.status(401).json({ msg: "Admin ID not found in request" });
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
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

exports.getVerifiedNgos = async (req, res) => {
  try {
    // Fetch all NGOs from Admin collection
    // Assuming all Admin entries are verified NGOs; add filter if needed
    const ngos = await Admin.find({}, {
      orphanageName: 1,
      ngoLocation: 1,
      address: 1,
      phone: 1,
      email: 1,
      website: 1,
      mission: 1,
      needs: 1,
      requirements: 1
    }).lean();

    console.log("Fetched NGOs from DB:", ngos); // Added log

    // Map to desired format
    const formattedNgos = ngos.map(ngo => ({
      id: ngo._id,
      name: ngo.orphanageName || "Unnamed NGO",
      location: ngo.ngoLocation || "",
      address: ngo.address || "",
      phone: ngo.phone || "",
      email: ngo.email || "",
      website: ngo.website || "",
      mission: ngo.mission || "",
      needs: ngo.needs || "",
      requirements: ngo.requirements || []
    }));

    res.status(200).json({ ngos: formattedNgos });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({ message: "Failed to fetch NGOs" });
  }
};
