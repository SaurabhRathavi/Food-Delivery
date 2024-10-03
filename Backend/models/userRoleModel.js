const Role=require("./roleModel.js")
const User=require("./userModel.js")


module.exports = (connectDB,DataTypes)=>{
    const UserRole=connectDB.define("UserRole",{
      user_role_uuid:{
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull:false,
          primaryKey:true         
      },
     role_uuid:{
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model:Role,
            key:'uuid'
        },
        unique:false
     },
     user_uuid:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:false,
        references:{
            model:User,
            key:'uuid'
        }
     }
    },
    {
      timestamps:true,
      tableName:"user_roles"
  })
    return UserRole   
}
