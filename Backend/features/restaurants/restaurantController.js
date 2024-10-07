const { addUser } = require("../users/userService.js");
const restaurantSignup = async (req, res) => {
  try {
    if (req.body.role != "restaurant") {
      throw Error("You can singnup as only restaurant through this route");
    }
    const response = await addUser(req.body);
    res.status(200).send({
      status: "success",
      message: "Restaurant Created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { restaurantSignup };
