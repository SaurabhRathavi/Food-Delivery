const { addUser } = require("../users/userService.js");
const asyncErrorHandler = require("../../utils/asyncErrorHandler.js");

const deliveryPartnerSignup = asyncErrorHandler(async (req, res) => {
  if (req.body.role != "delivery_partner") {
    throw Error("You can singnup as only delivery partner through this route");
  }

  const response = await addUser(req.body);

  res.status(200).send({
    status: "success",
    message: "Delivery Partner Created Successfully",
    data: response,
  });
});

module.exports = { deliveryPartnerSignup };
