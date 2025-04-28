const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  metrics: {
    type: Map,
    of: Number, // Adjust type as needed (e.g., String, Date, etc.)
    default: {},
  },
  achievements: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Progress", progressSchema);
