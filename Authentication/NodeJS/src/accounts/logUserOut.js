import jwt from 'jsonwebtoken';

const JWTSignature = process.env.JWT_SIGNATURE;

export const logUserOut = async (request, reply) => {
  const { session } = await import('../session/session.js');

  if (request?.cookies?.refreshToken) {
    // get refresh token
    const { refreshToken } = request.cookies;
    const { sessionToken } = jwt.verify(refreshToken, JWTSignature); // decode jwt

    // delete database record for session
    await session.deleteOne({
      sessionToken,
    });
  }
  // remove cookies
  reply.clearCookie('refreshToken').clearCookie('accessToken');

  try {
  } catch (error) {
    throw new Error(error);
  }
};
