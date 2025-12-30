const express = require("express");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

const router = express.Router();

// GET current user profile
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// ACTIVATE SUBSCRIPTION
router.post("/subscribe", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ msg: "User not found" });

  user.subscribed = true;
  await user.save();

  res.json({ msg: "Subscription activated successfully" });
});

module.exports = router;
