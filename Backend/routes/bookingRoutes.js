const express = require("express");
const bookingController = require("../controllers/bookingController");
const expertController = require("../controllers/expertController");

const auth = require("../middleware/auth");
const router = express.Router();

router.post("/book", auth, bookingController.bookSession);
router.get("/user-bookings", auth, bookingController.getUserBookings);
router.get("/expert-bookings", auth, bookingController.getExpertBookings);
router.post("/update", auth, expertController.updateExpertProfile);
router.get("/experts", expertController.getAllExperts);
router.get("/:userId", auth, expertController.getExpertProfile);

module.exports = router;
