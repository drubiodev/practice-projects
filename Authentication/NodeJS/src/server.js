import { logInfo, logError, logSuccess } from './log/index.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import Routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM specific to get access to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

app.register(Routes);

export const startApp = async () => {
  try {
    await app.listen(process.env.PORT);
    logInfo(`Server Listening at: http://127.0.0.1:${process.env.PORT}`);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};
