const db = require("../../connection.js");
const bcrypt = require("bcrypt");
const { loginUser } = require("./authService.js");
const getPublicKey = require("../../utils/getPublicKey.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const login = asyncErrorHandler(async (req, res) => {
  const response = await loginUser(
    req.body.email,
    req.body.password,
    req.body.role
  );

  res.cookie("token", response.jwtToken, { httpOnly: true });

  res.status(200).send({
    status: "success",
    message: "login succesfull",
    data: response.user,
  });
});

const handlePublicKey = asyncErrorHandler(async (req, res) => {
  const publicKey = await getPublicKey();

  res.status(200).send({
    status: "success",
    data: publicKey,
  });
});
module.exports = { login, handlePublicKey };
