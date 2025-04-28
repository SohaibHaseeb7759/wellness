// models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  wellnessGoals: {
    type: String,
    required: true,
  },
  healthCondition: {
    type: String,
    required: true,
  },
  achievements: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
