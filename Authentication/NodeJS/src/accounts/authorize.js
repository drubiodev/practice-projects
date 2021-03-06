import pkg from 'bcryptjs';
const { compare } = pkg;

export const authorizeUser = async (email, password) => {
  const { user } = await import('../user/user.js');
  // look up user
  const userData = await user.findOne({
    'email.address': email,
  });

  if (userData === null) return false;
  // get user password
  const savedPassword = userData.password;
  // compare password with one in db
  const isAuthorized = await compare(password, savedPassword);
  // return if password is correct
  return { isAuthorized, userId: userData._id };
};
