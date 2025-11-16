import Book from "./models/Book.js";

const seedData = [
  { title: "The Alchemist", author: "Paulo Coelho", price: 12.99, description: "A shepherd's journey." },
  { title: "1984", author: "George Orwell", price: 9.99, description: "Dystopian classic." },
  { title: "Sapiens", author: "Yuval Noah Harari", price: 18.50, description: "History of humankind." },
  { title: "Atomic Habits", author: "James Clear", price: 14.99, description: "Tiny changes." },
  { title: "The Hobbit", author: "J.R.R. Tolkien", price: 11.49, description: "Unexpected journey." },
];

export default async function seed() {
  try {
    await Book.deleteMany({});  // Clear old
    await Book.insertMany(seedData);
    console.log("5 demo books seeded!");
  } catch (e) {
    console.log("Seed error:", e.message);
  }
}