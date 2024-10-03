const express=require("express")
const {deliveryPartnerSignup}=require("./deliveryPartnerController.js")

const router=express.Router();

router.post("/delivery_partner/signup",deliveryPartnerSignup)

module.exports=router