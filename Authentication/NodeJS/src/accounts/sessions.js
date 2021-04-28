import { randomBytes } from 'crypto';

export const createSession = async (userId, connection) => {
  try {
    // generate session token
    const sessionToken = randomBytes(43).toString('hex');
    // retrieve connection information
    const { ip, userAgent } = connection;
    // database insert for session
    const { session } = await import('../session/session.js');
    await session.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createAt: new Date(),
    });
    // return session token
    return sessionToken;
  } catch (error) {
    throw new Error('Session Creation Failed');
  }
};
