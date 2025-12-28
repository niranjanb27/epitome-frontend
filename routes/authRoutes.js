const express = require("express");
const { register, login } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

// Get current logged-in user info
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("shopName name email role");
    res.json(user);
  } catch (err) {
    console.error("Failed to fetch user info:", err);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
});

module.exports = router;
