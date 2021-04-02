import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;

export const registerUser = async (email, password) => {
  // generate salt
  const salt = await genSalt(10);
  // hash with salt
  const hashPassword = await hash(password, salt);
  // store in database
  // return user
};
