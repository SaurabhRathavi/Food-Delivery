const {getUserByEmail,createUser}=require("./useRepository.js")
const {getRoleByName}=require("../role/roleRepository.js");
const { createNewUserRole, getByUserAndRoleUUID,saveUser } = require("../user_role/userRoleRepository.js");
const { ValidationErrorItemOrigin, where } = require("sequelize");
const bcrypt=require('bcrypt')
const crypto = require('crypto');
const nodemailer=require('nodemailer');
const db = require("../../connection.js");
const Op=require("sequelize")
const validateForm = require("../../utils/validateForm.js")

const addUser=async (userData)=>{

    const validationResult=validateForm(userData)

  
    if (!validationResult.isValid) {    
    throw Error(validationResult.errors)    
  }
     
    const user=await getUserByEmail(userData.email);

    if(user){
        throw Error("user already exist");
    }

    const {role,...userInfo}=userData;
    console.log(userInfo);
    console.log(123);
    

    const response=await createUser(userInfo)
    console.log(1234);
    
    const new_role=await getRoleByName(role)
    console.log(1234);
    
    await createNewUserRole(response.uuid,new_role.uuid);
    

    return response
}


const addUserRole=async (userData)=>{

    // try{

    const user=await getUserByEmail(userData.email);

    if(!user){
        throw Error("User is not exist with this email")
    }
    const passwordMatch = await bcrypt.compare(userData.password, user.password);
    if(!passwordMatch){
      throw Error("wrong password")
    }
    
    const new_role=await getRoleByName(userData.role)
    const userRoleData = await getByUserAndRoleUUID(user.uuid,new_role.uuid)
    
    console.log(userRoleData);
    
     if(userRoleData.length!=0){
         throw new Error("User already exist with this email and role")
     }
 
     
     await createNewUserRole(user.uuid,new_role.uuid);

     return {
        message:"user role added succesfully"
     }
    // }
    // catch(error){
    //   throw new Error(error.message || "Unable to add new role")
    // }

}

const createRefreshToken=async (email,req)=>{
     
        const user=await getUserByEmail(email);

        if(!user){
           throw new Error("No user exist with this email");
        }
       

        const token=crypto.randomBytes(32).toString('hex');
        user.reset_token=token;
        user.reset_token_expiration = Date.now() + 3600000;  
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'saurabh.rathavi@argusoft.in',
              pass: 'rpgc tsyq chdt lkpp ',
            },
          });
          const resetLink = `http://localhost:8080/reset-password?token=${token}`;
  
          await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click the link below to reset your password:${resetLink}`,
     });
        

        
return {
    message:"link send "
}

}

const updatePassword = async (token,password) => {
   
    console.log(123);
    console.log(token);
    
    
    const user = await db.User.findOne({where:{reset_token:token}})
    console.log(user);
      
  if (!user) {
     throw new Error("user not found")
  }


  user.password = password;
  user.reset_token = null;
  user.reset_token_expiration = null;
  await user.save();

  
  return{
    message:"password changed"
  }
}
module.exports={addUser,addUserRole,createRefreshToken,updatePassword}