const Preference = require("../models/Preference");
const { generatePersonalizedAdvice } = require("../services/adviceService");
const { specificAdvice } = require("../services/specificAdvice");

exports.advice = (req, res) => {
  const profile = req.body;
  if (!profile) {
    return res.status(400).json({ error: "Profile data is required" });
  }

  const advice = generatePersonalizedAdvice(profile);
  console.log(advice);
  res.status(200).json({ advice });
};

exports.pre = async (req, res) => {
  const { categories, focusAreas } = req.body;
  console.log(req.body);
  const userId = req.user.id;

  try {
    // Log incoming payload for debugging

    // Find preference by user ID
    let preference = await Preference.findOne({ user: userId });
    if (!preference) {
      preference = new Preference({ user: userId, categories, focusAreas });
    } else {
      preference.categories = categories;
      preference.focusAreas = focusAreas;
      preference.updatedAt = Date.now();
    }
    console.log("Incoming payload:", { categories, focusAreas });

    const advice = specificAdvice({ categories, focusAreas });
    console.log(advice);
    await preference.save();
    res.status(200).json({ preference, advice });
  } catch (error) {
    console.error("Error in preference update:", error);
    res.status(500).json({ error: "Error updating preferences" });
  }
};
