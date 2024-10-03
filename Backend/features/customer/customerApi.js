const express=require("express")
const {customerSignup}=require("./customerController.js")

const router=express.Router();

router.post('/customer/signup',customerSignup)

module.exports=router