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
      logError(error);
    }
  });

  server.post('/api/authorize', {}, async (request, reply) => {
    try {
      const isAuthorized = await authorizeUser(
        request.body.email,
        request.body.password
      );

      if (isAuthorized) {
        logSuccess('User Authorized');
      } else {
        logError('Not Authorized');
      }
    } catch (error) {
      logError(error);
    }
  });
};

export default routes;