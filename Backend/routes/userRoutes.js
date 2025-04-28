const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  verifyUser,
} = require("../controllers/userController");
const {
  requestPasswordReset,
  resetPassword,
} = require("../controllers/passwordController");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.get("/verify", verifyUser);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

module.exports = router;
