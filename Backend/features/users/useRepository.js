const db=require("../../connection.js")


const getUserByEmail=async (email)=>{
   const user=await db.User.findOne({where:{email:email}})
   return user
}

const createUser=async (userInfo)=>{
    return await db.User.create(userInfo)
}

const saveUser=async (user)=>{
    await user.save();
  }

module.exports={getUserByEmail,createUser,saveUser}