require('dotenv/config');
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const communtieRoutes = require("./routes/communtieRoutes");
const groupRoutes = require("./routes/groupRoutes");
const placeRoutes = require("./routes/placeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.use("/users", userRouter);
app.use("/chat", chatRoutes);
app.use("/community", communtieRoutes)
app.use("/group", groupRoutes);
app.use("/places", placeRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);


// Database connection
connectDB()
  .then(() => {
    // Start the server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
