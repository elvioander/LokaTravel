const { MongoClient } = require("mongodb");
const fs = require("fs");

// MongoDB connection URL
const url =
  "mongodb+srv://mariodaruranto68:mariodrt68@cluster0.37oygjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URL
const client = new MongoClient(url);

// Read data from JSON file
const data = JSON.parse(fs.readFileSync("./seed/data.json", "utf-8"));

async function seedDatabase() {
  try {
    await client.connect();
    const db = client.db("lokatravel"); // Replace with your database name
    const collection = db.collection("places"); // Replace with your collection name

    // Insert data
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();
