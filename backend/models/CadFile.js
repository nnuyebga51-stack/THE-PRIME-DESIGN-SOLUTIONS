const mongoose = require("mongoose");

const CadFileSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  premium: Boolean
}, { timestamps: true });

module.exports = mongoose.model("CadFile", CadFileSchema);
