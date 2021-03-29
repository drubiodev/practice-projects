import './env.js';
import { startApp } from './server.js';
import { connectDb } from './db.js';

connectDb().then(() => startApp());
