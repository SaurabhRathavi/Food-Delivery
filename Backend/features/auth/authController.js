const db = require("../../connection.js");
const bcrypt = require("bcrypt");
const {loginUser} = require("./authService.js")

const login = async (req, res) => {
  try {
    console.log(req.body.email,req.body.password,req.body.role);   
  
    const jwtToken=await loginUser(req.body.email,req.body.password,req.body.role);   
    res.cookie('token', jwtToken);
    
    res.status(200).send({
      status: "success",
      message: "login succesfull",
      token: jwtToken,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { login };
