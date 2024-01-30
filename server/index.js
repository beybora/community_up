require('dotenv/config');
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.use("/users", userRouter);

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
