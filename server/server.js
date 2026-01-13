import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";  
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import {clerkMiddleware} from '@clerk/express'

const app = express();

await connectDB();
await connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.send("Api Working");
});

// ❗ Route that throws real error
app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.post("/webhooks", clerkWebhooks);

app.use("/api/company", companyRoutes);

app.use("/api/jobs", jobRoutes)

app.use("/api/users", userRoutes)

// ❗ Sentry MUST be after routes
Sentry.setupExpressErrorHandler(app);

// Optional fallback error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    sentryId: res.sentry,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
