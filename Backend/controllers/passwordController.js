const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendPasswordResetEmail } = require("../services/emailService");

// const { sendPasswordResetEmail } = require("../services/emailService");

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Password reset request error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.body;
    const { password } = req.body;
    console.log(token);
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Password reset error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
