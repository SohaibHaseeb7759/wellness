const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adviceRoutes = require("./routes/adviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is running oh yeah!!");
});

app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/advice", adviceRoutes);
app.use("/api/book", bookingRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Client left room: ${room}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", {
      message: data.message,
      from: data.from,
    });
    console.log(`Message sent to room ${data.room}: ${data.message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
