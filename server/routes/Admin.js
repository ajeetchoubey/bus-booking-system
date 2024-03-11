const { Router } = require("express");
const adminMiddleware = require("../middlewares/Admin");
const router = Router();
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    
})

module.exports = router