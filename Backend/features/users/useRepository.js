const db = require("../../connection.js");

const getUserByEmail = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  return user;
};

const createUser = async (userInfo) => {
  return await db.User.create(userInfo);
};

const getUserByResetToken = async (token) => {
  return await db.User.findOne({ where: { reset_token: token } });
};

const saveUser = async (user) => {
  await user.save();
  return;
};

module.exports = { getUserByEmail, createUser, saveUser, getUserByResetToken };
