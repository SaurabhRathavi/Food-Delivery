const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const {
  addUser,
  addUserRole,
  createResetToken,
  updatePassword,
} = require("./userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const signUp = asyncErrorHandler(async (req, res) => {
  const response = await addUser(req.body);
  res.status(200).send({
    status: "success",
    message: "User Created Successfully",
    data: response.dataValues,
  });
});

const addRole = asyncErrorHandler(async (req, res) => {
  const response = await addUserRole(req.body);
  res.status(200).send({
    status: "success",
    data: response,
  });
});

const forgotPassword = asyncErrorHandler(async (req, res) => {
  const { email } = req.body;

  const response = await createResetToken(email, req);
  res.status(200).send({
    status: "success",
    message: response.message,
  });
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  const response = await updatePassword(token, newPassword);

  res.status(200).send({
    status: "success",
    message: response.message,
  });
});

const getUser = asyncErrorHandler(async (req, res) => {
  res.json({ first_name: req.first_name, email: req.email });
});

const logoutUser = asyncErrorHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "user logged out" });
});

module.exports = {
  signUp,
  addRole,
  forgotPassword,
  resetPassword,
  getUser,
  logoutUser,
};
