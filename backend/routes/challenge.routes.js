const express = require("express");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const Challenge = require("../models/Challenge");

const router = express.Router();

// CREATE CHALLENGE (ADMIN ONLY)
router.post("/", auth, admin, async (req, res) => {
  const { title, description, deadline } = req.body;
  const ch = await Challenge.create({
    title, description, deadline, createdBy: req.user.id, submissions: []
  });
  res.json(ch);
});

// GET ALL CHALLENGES
router.get("/", auth, async (req, res) => {
  const challenges = await Challenge.find().populate("createdBy", "email");
  res.json(challenges);
});

// SUBMIT CHALLENGE (USER)
router.post("/:id/submit", auth, async (req, res) => {
  const { fileName } = req.body;
  const ch = await Challenge.findById(req.params.id);
  if (!ch) return res.status(404).json({ msg: "Challenge not found" });

  ch.submissions.push({ user: req.user.id, fileName, submittedAt: new Date() });
  await ch.save();
  res.json({ msg: "Submission successful" });
});

module.exports = router;
