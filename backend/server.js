
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
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = require("./app"); // your express app
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
});

io.on("connection", socket => {
  console.log("User connected:", socket.user.email);

  socket.on("joinGroup", groupId => {
    socket.join(groupId);
  });

  socket.on("sendMessage", data => {
    io.to(data.groupId).emit("receiveMessage", {
      user: socket.user.email,
      text: data.text,
      time: new Date()
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

module.exports = server;
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
