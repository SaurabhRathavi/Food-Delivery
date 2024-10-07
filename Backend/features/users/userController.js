const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const {
  addUser,
  addUserRole,
  createResetToken,
  updatePassword,
} = require("./userService.js");

const signUp = async (req, res) => {
  try {
    const response = await addUser(req.body);
    res.status(200).send({
      status: "success",
      message: "User Created Successfully",
      data: response.dataValues,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const addRole = async (req, res) => {
  try {
    const response = await addUserRole(req.body);
    res.status(200).send({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await createResetToken(email, req);
    res.status(200).send({
      status: "success",
      message: response.message,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const response = await updatePassword(token, newPassword);

    res.status(200).send({
      status: "success",
      message: response.message,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const getUser = (req, res) => {
  try {
    res.json({ first_name: req.first_name, email: req.email });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", { expires: new Date(Date.now()) });

  res.json({ message: "user logged out" });
};

module.exports = {
  signUp,
  addRole,
  forgotPassword,
  resetPassword,
  getUser,
  logoutUser,
};
