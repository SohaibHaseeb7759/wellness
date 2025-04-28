const Progress = require("../models/Progress");

// Update Progress
exports.updateProgress = async (req, res) => {
  try {
    const { metrics, achievements } = req.body;
    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        metrics,
        achievements,
      });
    } else {
      progress.metrics = metrics;
      progress.achievements = achievements;
      progress.updatedAt = Date.now();
    }
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Generate Advice Based on Progress
exports.generateAdvice = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    const { steps, caloriesBurned } = progress.metrics;
    let advice;

    // Example advice generation logic based on both metrics
    if (steps > 10000 && caloriesBurned > 500) {
      advice =
        "Excellent job! You're exceeding your daily goals. Continue with this routine, and consider adding more variety to your workouts to challenge yourself.";
    } else if (steps > 10000) {
      advice =
        "Great work hitting your step goal! Try to also focus on burning more calories to enhance your fitness. Adding some high-intensity workouts could be beneficial.";
    } else if (caloriesBurned > 500) {
      advice =
        "You're doing well with calorie burning. To improve overall fitness, try incorporating more steps into your daily routine, such as walking or jogging.";
    } else if (steps > 5000) {
      advice =
        "You're on the right track with your step count. Aim to increase your steps gradually and also focus on calorie burning to reach your fitness goals.";
    } else {
      advice =
        "Start by setting smaller, achievable goals. Aim to increase your daily steps and calorie burn gradually. Incorporating regular exercise and a balanced diet will help you improve over time.";
    }

    res.json({ advice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
