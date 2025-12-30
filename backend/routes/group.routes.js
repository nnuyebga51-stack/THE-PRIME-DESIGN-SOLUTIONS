const express = require("express");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const Group = require("../models/Group");

const router = express.Router();

// CREATE GROUP (ADMIN ONLY)
router.post("/", auth, admin, async (req, res) => {
  const { name } = req.body;
  const group = await Group.create({ name, open: true, members: [], messages: [] });
  res.json(group);
});

// GET ALL GROUPS
router.get("/", auth, async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

// JOIN GROUP (USER)
router.post("/:id/join", auth, async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ msg: "Group not found" });

  if (!group.members.includes(req.user.id)) group.members.push(req.user.id);
  await group.save();
  res.json({ msg: "Joined group" });
});

// SEND MESSAGE
router.post("/:id/message", auth, async (req, res) => {
  const { text } = req.body;
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ msg: "Group not found" });
  if (!group.open) return res.status(403).json({ msg: "Chat closed by admin" });

  group.messages.push({ user: req.user.id, text, time: new Date() });
  await group.save();
  res.json({ msg: "Message sent" });
});

// TOGGLE CHAT (ADMIN ONLY)
router.post("/:id/toggle", auth, admin, async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ msg: "Group not found" });

  group.open = !group.open;
  await group.save();
  res.json({ msg: `Group chat ${group.open ? "opened" : "closed"}` });
});

module.exports = router;
