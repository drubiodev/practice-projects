import mongo from 'mongodb';
import { logInfo, logError } from './log/index.js';

const { MongoClient } = mongo;

const url = process.env.MONGO_URL;

export const client = new MongoClient(url, { useNewUrlParser: true });

export const connectDb = async () => {
  try {
    await client.connect();
    // Confirm connection
    await client.db('admin').command({ ping: 1 });
    logInfo('Connected to Db');
  } catch (error) {
    logError(error);
    // If error close conection
    await client.close();
  }
};
