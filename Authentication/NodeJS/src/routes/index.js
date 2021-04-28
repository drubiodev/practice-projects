import { logError, logSuccess } from '../log/index.js';
import { registerUser } from '../accounts/register.js';
import { authorizeUser } from '../accounts/authorize.js';
const routes = async (server) => {
  server.post('/api/register', {}, async (request, reply) => {
    try {
      const userId = await registerUser(
        request.body.email,
        request.body.password
      );
      logSuccess('Registered');
    } catch (error) {
      logError(`Error Registering User: ${error}`);
    }
  });

  server.post('/api/authorize', {}, async (request, reply) => {
    try {
      const isAuthorized = await authorizeUser(
        request.body.email,
        request.body.password
      );
      isAuthorized ? logSuccess('User Authorized') : logError('Not Authorized');

      // Generate auth tokens
      // set cookies
      // reply
      //   .setCookie('testCookie', 'value test', {
      //     path: '/',
      //     domain: '127.0.0.1',
      //     httpOnly: true,
      //   })
      //   .send({ data: 'testing' });
    } catch (error) {
      logError(error);
    }
  });
};

export default routes;
