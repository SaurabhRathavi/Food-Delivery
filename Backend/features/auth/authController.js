const db = require("../../connection.js");
const bcrypt = require("bcrypt");
const { loginUser } = require("./authService.js");
const getPublicKey = require("../../utils/getPublicKey.js");

const login = async (req, res) => {
  try {
    const response = await loginUser(
      req.body.email,
      req.body.password,
      req.body.role
    );

    res.cookie("token", response.jwtToken);

    res.status(200).send({
      status: "success",
      message: "login succesfull",
      data: response.user,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

const handlePublicKey = async (req, res) => {
  try {
    const publicKey = await getPublicKey();

    res.status(200).send({
      status: "success",
      data: publicKey,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error,
    });
  }
};
module.exports = { login, handlePublicKey };
