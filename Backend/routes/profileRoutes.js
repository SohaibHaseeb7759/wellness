// routes/profileRoutes.js
const express = require("express");
const profileController = require("../controllers/profileController");
const upload = require("../middleware/uploadProfilePicture");
const auth = require("../middleware/auth");
const router = express.Router();

router.post(
  "/create",
  auth,
  upload.single("profilePicture"),
  profileController.createProfile
);
router.put(
  "/update",
  auth,
  upload.single("profilePicture"),
  profileController.updateProfile
);
router.get("/profiles", auth, profileController.getProfile);

module.exports = router;
