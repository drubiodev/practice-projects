import pkg from 'bcryptjs';
const { genSalt, hash } = pkg;

export const registerUser = async (email, password) => {
  // wont load till called
  const { user } = await import('../user/user.js');

  // check if user already exist
  const userData = await user.findOne({
    'email.address': email,
  });

  if (userData !== null) throw 'User already Exist';

  // generate salt
  const salt = await genSalt(10);
  // hash with salt
  const hashPassword = await hash(password, salt);
  // store in database
  const result = await user.insertOne({
    email: {
      address: email,
      verified: false,
    },
    password: hashPassword,
  });
  // return user
  return result.insertedId;
};
