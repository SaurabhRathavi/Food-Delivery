const { addUser } = require("../users/userService.js");

const deliveryPartnerSignup = async (req, res) => {
  try {
    if (req.body.role != "delivery_partner") {
      throw Error(
        "You can singnup as only delivery partner through this route"
      );
    }

    const response = await addUser(req.body);

    res.status(200).send({
      status: "success",
      message: "Delivery Partner Created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { deliveryPartnerSignup };
