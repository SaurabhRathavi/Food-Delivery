const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next)=> {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }


    // const decodedToken=jwt.verify(token, process.env.JWT_SECRET_KEY)
        // req.userId = decoded.id; 
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token.' });
            }
     req.first_name=decoded.first_name,
     req.email=decoded.email;
     next();  
    
})
}

module.exports={verifyToken}