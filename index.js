import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/books.js";
import seed from "./seed.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Bookstore API is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    seed();
  })
  .catch((err) => console.log("DB error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
