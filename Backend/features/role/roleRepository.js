
const db=require("../../connection.js")

const getRoleByName=async (roleName)=>{

   return await db.Role.findOne({where:{name:roleName}})

}

module.exports={getRoleByName}