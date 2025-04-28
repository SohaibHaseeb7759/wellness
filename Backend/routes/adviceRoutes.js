// routes/adviceRoutes.js
const express = require("express");
const router = express.Router();
const { advice, pre } = require("../controllers/adviceController");
const progressController = require("../controllers/progressController");
const auth = require("../middleware/auth");

// POST /api/advice/generate
router.post("/generate", advice);
router.put("/preferences", auth, pre);
router.put("/progress", auth, progressController.updateProgress);
router.get("/advice", auth, progressController.generateAdvice);
module.exports = router;
