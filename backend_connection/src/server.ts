import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import * as crypto from "crypto";
import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import dotenv from "dotenv";
import { serviceRouter } from "./api/service/serviceRouter";

dotenv.config();

// Validate necessary environment variables
if (!process.env.PORT) {
  throw new Error("PORT is missing in the environment variables.");
}

const logger = pino({ name: "server start" });
const app: Express = express();

const secretKey = crypto.randomBytes(32).toString("hex");

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
// app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter); // Route for user authentication
app.use("/services", serviceRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
