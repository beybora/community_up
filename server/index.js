require("dotenv/config");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
const userRouter = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const communtieRoutes = require("./routes/communtieRoutes");
const groupRoutes = require("./routes/groupRoutes");
const placeRoutes = require("./routes/placeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/users", userRouter);
app.use("/chat", chatRoutes);
app.use("/community", communtieRoutes);
app.use("/group", groupRoutes);
app.use("/places", placeRoutes);
app.use("/events", eventRoutes);
app.use("/messages", messageRoutes);

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`);
    });

    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        cors: true,
        origin: process.env.FRONTEND_URL,
      },
    });

    //create basic socket connection
    io.on("connection", (socket) => {
      socket.on("newMessage", (newMessageReceived) => {
        socket.broadcast.emit("messageReceived", newMessageReceived);
      });

      socket.on("newCommunity", (newCommunityReceived) => {
        socket.broadcast.emit("communityReceived", newCommunityReceived);
      });

      socket.on("newGroup", (newGroupReceived) => {
        socket.broadcast.emit("groupReceived", newGroupReceived);
      });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
