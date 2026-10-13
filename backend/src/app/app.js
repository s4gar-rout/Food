
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// Security middleware
app.use(helmet());

// Request logging
app.use(morgan("dev"));

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//importing Routes

import healthRoutes from "../routes/health.routes.js";
import authRoutes from "../routes/auth.routes.js";

// Health route
app.use("/api/v1/health", healthRoutes);

//Auth Routes
app.use("/api/auth", authRoutes)
export default app;