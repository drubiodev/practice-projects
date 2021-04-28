import { createSession } from './sessions.js';
import { createTokens } from './tokens.js';

export const logUserIn = async (userId, request, reply) => {
  const connectionInformation = {
    ip: request.ip,
    userAgent: request.headers['user-agent'],
  };
  // create session
  const sessionToken = await createSession(userId, connectionInformation);
  // create jwt
  const { accessToken, refreshToken } = await createTokens(
    sessionToken,
    userId
  );
  // set cookie
  const now = new Date();
  const refreshExpires = now.setDate(now.getDate + 30);

  reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      domain: '127.0.0.1',
      httpOnly: true,
      expires: refreshExpires,
    })
    .setCookie('accessToken', accessToken, {
      path: '/',
      domain: '127.0.0.1',
      httpOnly: true,
    });
};
