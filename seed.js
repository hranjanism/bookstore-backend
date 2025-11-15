import Book from "./models/Book.js";

const seedData = [
  { title: "The Alchemist", author: "Paulo Coelho", price: 12.99, description: "A shepherd's journey of dreams." },
  { title: "1984", author: "George Orwell", price: 9.99, description: "A dystopian social science fiction novel." },
  { title: "Sapiens", author: "Yuval Noah Harari", price: 18.50, description: "A brief history of humankind." },
  { title: "Atomic Habits", author: "James Clear", price: 14.99, description: "Tiny changes, remarkable results." },
  { title: "The Hobbit", author: "J.R.R. Tolkien", price: 11.49, description: "An unexpected journey." },
];

export default async function seed() {
  try {
    await Book.deleteMany({});  // Clear old data
    await Book.insertMany(seedData);
    console.log("5 demo books added!");
  } catch (e) {
    console.log("Seed error:", e.message);
  }
}
