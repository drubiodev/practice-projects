import './env.js';
import { logInfo, logError } from './log/index.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './db.js';

// ESM specific to get access to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

// app.get('/', async (request, reply) => {
//   return { hello: 'world' };
// });

const startApp = async () => {
  try {
    await app.listen(3000);
    logInfo('Server Listening at port: 3000');
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};

connectDb().then(() => startApp());
