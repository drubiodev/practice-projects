import mongo from 'mongodb';
import jwt from 'jsonwebtoken';

const { ObjectId } = mongo;

const JWTSignature = process.env.JWT_SIGNATURE;
export const getUserFromCookies = async (request) => {
  try {
    // wont load till called
    const { user } = await import('../user/user.js');
    // check to make sure access token exist
    if (request?.cookies?.accessToken) {
      // if access token
      const { accessToken } = request.cookies;
      // decode jwt
      const decodedAccessToken = jwt.verify(accessToken, JWTSignature);
      console.warn(decodedAccessToken);
      // return user from record
      // TODO: dont return password
      return await user.findOne({ _id: ObjectId(decodedAccessToken?.userId) });
    }

    // get access and refresh tokens
    // decode refresk token
    // look up session
    // confirm session is valid
    // if session is valid
    // look up current user
    //  refresh tokens
    // return current user
  } catch (error) {
    throw new Error('Failed getting user from cookie');
  }
};

export const refreshTokens = async () => {
  try {
  } catch (error) {
    throw new Error('Failed refreshing token');
  }
};
