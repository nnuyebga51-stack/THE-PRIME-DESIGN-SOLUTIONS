const express = require("express");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const ActivityLog = require("../models/ActivityLog");

const router = express.Router();

// GET ALL ACTIVITY LOGS
router.get("/logs", auth, admin, async (req, res) => {
  const logs = await ActivityLog.find().sort({ timestamp: -1 });
  res.json(logs);
});

// CLEAR LOGS
router.delete("/logs", auth, admin, async (req, res) => {
  await ActivityLog.deleteMany();
  res.json({ msg: "Logs cleared" });
});

module.exports = router;
