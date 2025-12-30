const express = require("express");
const multer = require("multer");
const CadFile = require("../models/CadFile");
const auth = require("../middleware/auth.middleware");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", auth, upload.single("file"), async (req, res) => {
  const cad = await CadFile.create({
    title: req.body.title,
    filePath: req.file.path,
    author: req.user.id,
    premium: req.body.premium
  });
  res.json(cad);
});

router.get("/", async (_, res) => {
  const files = await CadFile.find().populate("author", "email");
  res.json(files);
});

module.exports = router;
