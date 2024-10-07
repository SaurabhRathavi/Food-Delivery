const express = require("express");
const {
  signUp,
  addRole,
  forgotPassword,
  resetPassword,
  getUser,
  logoutUser,
} = require("./userController.js");
const db = require("../../connection.js");
const { login } = require("../auth/authController.js");
const { verifyToken } = require("../../middlewares/verifyToken.js");

const router = express.Router();

router.post("/add", addRole);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/logout", logoutUser);
router.get("/user", verifyToken, getUser);

module.exports = router;

// router.post("/addrole",async (req,res)=>{
//     await db.Role.create(req.body)
//     res.send({message:"role added"})
// })
