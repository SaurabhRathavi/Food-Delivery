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
const customError = require("../../utils/customError.js");

const addUser = async (userData) => {
  const validationResult = validateForm(userData);

  if (!validationResult.isValid) {
    throw new customError(validationResult.errors, 400);
  }
  const user = await getUserByEmail(userData.email);

  if (user) {
    throw new customError("user already exist", 400);
  }
  const privateKey = getPrivateKey();
  const decryptedPassword = decryptPassword(privateKey, userData.password);
  userData.password = decryptedPassword;

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
    throw new customError("User is not exist with this email", 400);
  }
  const passwordMatch = await bcrypt.compare(userData.password, user.password);
  if (!passwordMatch) {
    throw new customError("wrong password", 401);
  }

  const new_role = await getRoleByName(userData.role);
  const userRoleData = await getByUserAndRoleUUID(user.uuid, new_role.uuid);

  if (userRoleData.length != 0) {
    throw new customError("User already exist with this email and role", 400);
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
    throw new customError("No user exist with this email", 400);
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
    throw new customError("Token is not valid", 401);
  }

  const matchPasword = await bcrypt.compare(password, user.password);

  if (matchPasword) {
    throw new customError(
      "New password must be different from old password",
      400
    );
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
