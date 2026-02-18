import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import courseRoute from "./routes/course.route.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import orderRoute from "./routes/order.route.js";

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(express.json());
app.use(cookieParser());

// ✅ Proper CORS setup for Vite (5173 / 5174)
app.use(
  cors({
    origin: true, // allows any localhost port during development
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// =====================
// Database Connection
// =====================
const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("MongoDB Error:", error));

// =====================
// Routes
// =====================
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/order", orderRoute);

// =====================
// Cloudinary Config
// =====================
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// =====================
// Start Server
// =====================
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
