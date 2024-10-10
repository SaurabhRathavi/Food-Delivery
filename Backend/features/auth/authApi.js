const express = require("express");
const { login, handlePublicKey } = require("./authController.js");

const router = express.Router();

router.post("/login", login);
router.get("/public-key", handlePublicKey);

module.exports = router;
