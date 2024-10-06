import { MongoClient } from "mongodb";

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

class DbHelper {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log("Connected to the database");
    }
    return this.db;
  }

  async getCollection(collectionName) {
    const db = await this.connect();
    return db.collection(collectionName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.db = null;
      console.log("Database connection closed");
    }
  }
}

const dbHelper = new DbHelper();
export default dbHelper;
