import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, default: "" }
});

export default mongoose.model("Book", bookSchema);
