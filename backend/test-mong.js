require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});

async function test() {
  try {
    console.log("Connecting...");

    await client.connect();

    console.log("✅ MONGO CONNECTED");

    const result = await client.db().command({ ping: 1 });

    console.log("✅ PING:", result);
  } catch (error) {
    console.error("❌ FAILED:");
    console.error(error);
  } finally {
    await client.close();
  }
}

test();