const jwt=require('jsonwebtoken')

const signToken=(first_name,email)=>{
    return jwt.sign({first_name,email},process.env.JWT_SECRET_KEY)
}

module.exports={signToken}