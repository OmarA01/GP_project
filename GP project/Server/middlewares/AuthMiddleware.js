const { verify } = require('jsonwebtoken');


const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({error: "User not logged in"});
    try{
        const validToken = verify(accessToken, "tamam");
        req.user = validToken;
        if(validToken) return next();
    }
    catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Session expired" });  // Specific error for expired token
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Token is invalid" });  // Specific error for invalid token
        } else {
            return res.status(500).json({ error: "Failed to authenticate token" });  // General error for other issues
        }
    }
}

module.exports = {validateToken};