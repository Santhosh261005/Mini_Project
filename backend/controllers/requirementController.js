const Requirement = require('../models/Requirement');

exports.postRequirements = async (req, res) => {
  try {
    // Log incoming request to debug
    console.log("Request body:", req.body);

    const { adminName, requirements } = req.body;

    if (!requirements || !Array.isArray(requirements) || requirements.length === 0) {
      return res.status(400).json({ message: "No valid items received." });
    }

    // You can store the admin name or get the admin ID based on the name (depending on your logic)
    const newRequirement = new Requirement({
      adminName,  // Store admin name
      items: requirements.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        priority: item.priority || "medium",
        notes: item.notes || "",
      })),
    });

    // Save the requirement to the database
    const savedRequirement = await newRequirement.save();

    // Log saved requirement
    console.log("Saved requirement:", savedRequirement);

    // Send success response
    res.status(201).json({
      message: "Requirements posted successfully!",
      data: savedRequirement,
    });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
