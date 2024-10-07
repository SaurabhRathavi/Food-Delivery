const express = require("express");
const { restaurantSignup } = require("../restaurants/restaurantController.js");

const router = express.Router();

router.post("/restaurant/signup", restaurantSignup);

module.exports = router;
