const { MongoClient } = require("mongodb");
const fs = require("fs");

// MongoDB connection URL
const url =
  "mongodb://elvioander3:lBq5899zZQ3kVppY@cluster0-shard-00-00.bnsx7.mongodb.net:27017,cluster0-shard-00-01.bnsx7.mongodb.net:27017,cluster0-shard-00-02.bnsx7.mongodb.net:27017/?ssl=true&replicaSet=atlas-cf3c26-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URL
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
