const Profile = require("../models/Profile");

exports.createProfile = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, wellnessGoals, healthCondition } =
      req.body;
    const achievements = JSON.parse(req.body.achievements);

    const profilePicture = req.file
      ? req.file.path
      : "https://via.placeholder.com/150";

    const profile = new Profile({
      userId: req.user.id, // Use the authenticated user's ID
      firstName,
      lastName,
      age,
      gender,
      wellnessGoals,
      healthCondition,
      achievements,
      profilePicture,
    });

    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, wellnessGoals, healthCondition } =
      req.body;
    const achievements = JSON.parse(req.body.achievements);

    const profilePicture = req.file ? req.file.path : undefined;

    const updateData = {
      firstName,
      lastName,
      age,
      gender,
      wellnessGoals,
      healthCondition,
      achievements,
    };

    if (profilePicture) {
      updateData.profilePicture = profilePicture;
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id }, // Ensure the update is linked to the authenticated user
      updateData,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id }); // Fetch the profile of the authenticated user

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
