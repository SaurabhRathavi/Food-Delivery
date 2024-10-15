const { addUser } = require("../users/userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const customError = require("../../utils/customError.js");

const customerSignup = asyncErrorHandler(async (req, res) => {
  if (req.body.role != "customer") {
    throw customError("You can singnup as only customer through this route");
  }
  const response = await addUser(req.body);
  res.status(200).send({
    status: "success",
    message: "Customer Created Successfully",
    data: response,
  });
});

module.exports = { customerSignup };
