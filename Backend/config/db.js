const mongoose = require("mongoose");
const Profile = require("../models/Profile");
const Preference = require("../models/Preference");

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await Preference.collection.dropIndex("userId_1"); // Drop the index on the email field
    // console.log("Index on userId1 field dropped");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error : ", error);
    process.exit();
  }
};

module.exports = connectDB;
