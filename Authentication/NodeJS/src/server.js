import { logInfo, logError, logSuccess } from './log/index.js';
import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyCookie from 'fastify-cookie';
import Routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM specific to get access to dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();

export const startApp = async () => {
  try {
    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE,
    });

    app.register(fastifyStatic, {
      root: path.join(__dirname, 'public'),
    });

    app.register(Routes);

    await app.listen(process.env.PORT);

    logInfo(`Server Listening at: http://127.0.0.1:${process.env.PORT}`);
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};
