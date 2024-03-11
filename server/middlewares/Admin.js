const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")

function adminMiddleware(req, res, next){
    const token = req.headers.authorization;
    try{
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
            message: "Wrong credentials"
        })
    }
}

module.exports = adminMiddleware;