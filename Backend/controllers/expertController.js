// controllers/expertController.js
const Expert = require("../models/Expert"); // Your expert model

exports.updateExpertProfile = async (req, res) => {
  try {
    const { name, availability, expertise, bio } = req.body;
    const userId = req.user.id; // Assuming `req.user.id` is set by your auth middleware

    // Find and update the expert profile
    const expert = await Expert.findOneAndUpdate(
      { userId },
      { name, availability, expertise, bio },
      { new: true, upsert: true } // Create if not exists
    );

    res.json(expert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find()
      .populate({
        path: "userId",
        match: { role: "expert" },
        // select: "username email role", // Select fields from User if needed
      })
      .exec();

    // Filter out any results where the populate didn't match (i.e., user is not an expert)
    const filteredExperts = experts.filter((expert) => expert.userId);

    res.status(200).json(filteredExperts);
  } catch (err) {
    console.error("Error fetching experts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getExpertProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const expertProfile = await Expert.findOne({ userId });

    if (!expertProfile) {
      return res.status(404).json({ message: "Expert profile not found" });
    }

    res.status(200).json(expertProfile);
  } catch (error) {
    console.error("Error retrieving expert profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
