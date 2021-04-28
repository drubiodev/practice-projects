import jwt from 'jsonwebtoken';

const JWTSignature = process.env.JWT_SIGNATURE;

export const createTokens = async (sessionToken, userId) => {
  try {
    // create refresh token - sessionToken
    const refreshToken = jwt.sign(
      {
        sessionToken,
      },
      JWTSignature
    );
    // create access token - sessionToken, userID
    const accessToken = jwt.sign(
      {
        sessionToken,
        userId,
      },
      JWTSignature
    );
    // return refresh & access token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Creation of JWT Failed');
  }
};
