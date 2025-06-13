import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Reuse client in dev to prevent multiple connections
if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(uri, options);
  (global as any)._mongoClientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await (global as any)._mongoClientPromise;
  return client.db("voterdbuser"); // ✅ Updated to your database name
}
