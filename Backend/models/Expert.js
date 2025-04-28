const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  availability: {
    type: [String], // Array of strings for simplicity, can be more complex
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expert", expertSchema);
