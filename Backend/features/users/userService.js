const {
  getUserByEmail,
  createUser,
  saveUser,
  getUserByResetToken,
} = require("./useRepository.js");
const { getRoleByName } = require("../role/roleRepository.js");
const {
  createNewUserRole,
  getByUserAndRoleUUID,
} = require("../user_role/userRoleRepository.js");
const { ValidationErrorItemOrigin, where } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const db = require("../../connection.js");
const Op = require("sequelize");
const validateForm = require("../../utils/validateForm.js");
const { sendForgotPasswordMail } = require("../../utils/forgotPasswordMail.js");
const fs = require("fs");
const getPrivateKey = require("../../utils/getPrivateKey.js");
const decryptPassword = require("../../utils/decryptPassword.js");

const addUser = async (userData) => {
  const validationResult = validateForm(userData);

  const privateKey = getPrivateKey();
  const decryptedPassword = decryptPassword(privateKey, userData.password);
  userData.password = decryptedPassword;
  console.log(userData.password);
  

  if (!validationResult.isValid) {
    throw Error(validationResult.errors);
  }

  const user = await getUserByEmail(userData.email);

  if (user) {
    throw Error("user already exist");
  }

  const { role, ...userInfo } = userData;

  const response = await createUser(userInfo);
  const new_role = await getRoleByName(role);
  await createNewUserRole(response.uuid, new_role.uuid);

  return response;
};

const addUserRole = async (userData) => {
  // try{

  const user = await getUserByEmail(userData.email);

  if (!user) {
    throw Error("User is not exist with this email");
  }
  const passwordMatch = await bcrypt.compare(userData.password, user.password);
  if (!passwordMatch) {
    throw Error("wrong password");
  }

  const new_role = await getRoleByName(userData.role);
  const userRoleData = await getByUserAndRoleUUID(user.uuid, new_role.uuid);

  if (userRoleData.length != 0) {
    throw new Error("User already exist with this email and role");
  }

  await createNewUserRole(user.uuid, new_role.uuid);

  return {
    message: "user role added succesfully",
  };
  // }
  // catch(error){
  //   throw new Error(error.message || "Unable to add new role")
  // }
};

const createResetToken = async (email, req) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("No user exist with this email");
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.reset_token = token;
  user.reset_token_expiration = Date.now() + 3600000;
  await saveUser(user);

  const resetLink = `http://192.1.200.168:8080/reset-password?token=${token}`;

  await sendForgotPasswordMail(resetLink, user.email);

  return {
    message: "link send",
  };
};

const updatePassword = async (token, password) => {
  const user = await getUserByResetToken(token);

  if (!user) {
    throw new Error("user not found");
  }

  const matchPasword = await bcrypt.compare(password, user.password);

  if (matchPasword) {
    throw Error("New password must be different from old password");
  }

  user.password = password;
  user.reset_token = null;
  user.reset_token_expiration = null;
  await user.save();

  return {
    message: "password changed",
  };
};
module.exports = { addUser, addUserRole, createResetToken, updatePassword };
