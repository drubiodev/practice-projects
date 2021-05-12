import mongo from 'mongodb';
import jwt from 'jsonwebtoken';
import { createTokens } from './tokens.js';

const { ObjectId } = mongo;

const JWTSignature = process.env.JWT_SIGNATURE;
export const getUserFromCookies = async (request, reply) => {
  try {
    // wont load till called
    const { user } = await import('../user/user.js');
    const { session } = await import('../session/session.js');
    // check to make sure access token exist
    if (request?.cookies?.accessToken) {
      const { accessToken } = request.cookies;
      const { userId } = jwt.verify(accessToken, JWTSignature); // decode jwt

      // TODO: dont return password
      return await user.findOne({ _id: ObjectId(userId) });
    }
    // check to make sure access refresh exist
    if (request?.cookies?.refreshToken) {
      const { refreshToken } = request.cookies;
      const { sessionToken } = jwt.verify(refreshToken, JWTSignature); // decode jwt

      const currentSession = await session.findOne({
        sessionToken,
      });

      // confirm session is valid
      if (currentSession?.valid) {
        // look up current user
        const currentUser = await user.findOne({
          _id: ObjectId(currentSession.userId),
        });

        // refresh tokens
        await refreshTokens(sessionToken, currentSession._id, reply);
        // return user
        return currentUser;
      }
    }
  } catch (error) {
    throw new Error(`Failed getting user from cookie: ${error}`);
  }
};

export const refreshTokens = async (sessionToken, userId, reply) => {
  try {
    const { accessToken, refreshToken } = await createTokens(
      sessionToken,
      userId
    );

    // TODO: create own method for setting cookie
    const now = new Date();
    const refreshExpires = now.setDate(now.getDate() + 30);
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
  } catch (error) {
    throw new Error(`Failed refreshing token: ${error}`);
  }
};
