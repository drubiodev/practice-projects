import { logInfo, logError } from './log/index.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerUser } from './accounts/register.js';

// ESM specific to get access to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

app.post('/api/register', {}, async (request, reply) => {
  try {
    const userId = await registerUser(
      request.body.email,
      request.body.password
    );
    return userId;
  } catch (error) {
    console.error(error);
  }
});

export const startApp = async () => {
  try {
    await app.listen(process.env.PORT);
    logInfo(`Server Listening at port: ${process.env.PORT}`);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};
