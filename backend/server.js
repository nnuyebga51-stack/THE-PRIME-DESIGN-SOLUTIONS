
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/cad", require("./routes/cad.routes"));

app.listen(5000, () =>
  console.log("TPDS backend running on port 5000")
);
