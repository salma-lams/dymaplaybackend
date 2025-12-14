import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";
import customizeRoutes from "./routes/customize.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rate limiter
const globalLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(globalLimiter);

// Routes
app.use("/api/contact", rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }), contactRoutes);
app.use("/api/customize", rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }), customizeRoutes);

// Default route
app.get("/", (_req, res) => res.send("✅ Backend is running..."));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
