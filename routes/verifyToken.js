const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "compasso",(err, user)=>{
            if(err) res.status(403).json("Not valid token");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
        
        } else{
            res.status(403).json("Not Allowed")
        }
    })
}

module.exports = {verifyToken};
module.exports = {verifyTokenAndAuthorization};