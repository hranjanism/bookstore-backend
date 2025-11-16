import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookRoutes from "./routes/books.js";
import paymentRoutes from "./routes/payment.js";
import seed from "./seed.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api", paymentRoutes);  // Razorpay: /api/create-order & /api/verify-payment

// Root endpoint
app.get("/", (req, res) => {
  res.send("Bookstore API is running...");
});

// Connect to MongoDB + Seed Data
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await seed();  // Always seed 5 demo books
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});