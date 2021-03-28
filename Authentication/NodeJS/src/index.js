import './env.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';

console.log(process.env.MONGO_URL);

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
    console.log('Server Listening at port: 3000');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startApp();
