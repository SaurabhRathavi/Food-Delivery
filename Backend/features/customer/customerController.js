const { addUser } = require("../users/userService.js");

const customerSignup = async (req, res) => {
  try {
    if (req.body.role != "customer") {
      throw Error("You can singnup as only customer through this route");
    }
    const response = await addUser(req.body);
    res.status(200).send({
      status: "success",
      message: "Customer Created Successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { customerSignup };
