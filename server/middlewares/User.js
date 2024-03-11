const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

function userMiddleware(req, res, next){
    try{
        const token = req.headers.authorization;
        const decodedValue = jwt.verify(token, JWT_SECRET);

        if(decodedValue.username){
            next();
        }else{
            res.status(403).json({
                message: "You are not authorized"
            })
        }
    }catch(error){
        res.json({
            message: "Wrong Credentials"
        })
    }
}

module.exports = userMiddleware;