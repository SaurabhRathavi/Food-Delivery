const { addUser } = require("../users/userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");
const customError = require("../../utils/customError.js");

const restaurantSignup = asyncErrorHandler(async (req, res) => {
  if (req.body.role != "restaurant") {
    throw customError("You can singnup as only restaurant through this route");
  }
  const response = await addUser(req.body);
  res.status(200).send({
    status: "success",
    message: "Restaurant Created Successfully",
    data: response,
  });
});

module.exports = { restaurantSignup };
