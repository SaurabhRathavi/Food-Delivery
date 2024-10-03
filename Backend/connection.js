const { Sequelize, DataTypes, Model } = require('sequelize');


const connectDB=new Sequelize('food-delivery','postgres','saurabh@123',{
    host: "localhost",
    dialect: "postgres",
    logging: false,
})

const db={}

db.connectDB=connectDB

db.User=require("./models/userModel.js")(connectDB,DataTypes)
db.Role=require("./models/roleModel.js")(connectDB,DataTypes)
db.UserRole=require("./models/userRoleModel.js")(connectDB,DataTypes)

db.User.belongsToMany(db.Role, {
    through: db.UserRole,
    foreignKey: 'user_uuid', 
    otherKey: 'role_uuid' 
});
db.Role.belongsToMany(db.User, {
    through: db.UserRole,
    foreignKey: 'role_uuid', 
    otherKey: 'user_uuid' 
});

const check = async()=>{
    try{
    await db.connectDB.authenticate();
    console.log("Connection has been established");
    await db.connectDB.sync();
    console.log("all models are synchronized");
    }
    catch(error){
            console.log("unable to connect to database",error.message);
    }
}

db.check=check

module.exports = db