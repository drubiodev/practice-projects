import { logError, logSuccess } from '../log/index.js';
import { registerUser } from '../accounts/register.js';
import { authorizeUser } from '../accounts/authorize.js';
import { logUserIn } from '../accounts/logUserIn.js';
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
      const { isAuthorized, userId } = await authorizeUser(
        request.body.email,
        request.body.password
      );
      isAuthorized ? logSuccess('User Authorized') : logError('Not Authorized');

      if (isAuthorized) {
        await logUserIn(userId, request, reply);
        reply.send({
          data: 'Authorized',
        });
      }

      reply.code(403).send({
        data: 'Not Authorized',
      });
    } catch (error) {
      logError(error);
    }
  });
};

export default routes;
