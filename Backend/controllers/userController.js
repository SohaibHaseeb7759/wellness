const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    // Generate verification token
    const verificationToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
    });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Perform any additional verification steps here

    // Redirect to the login page after successful verification
    return res.redirect("http://localhost:3000/");
  } catch (error) {
    console.error("Verification error: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
