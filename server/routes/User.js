const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middlewares/User");
const { User, BusRoute, Booking } = require("../db");
const zod = require("zod");

const router = express.Router();

// creating the zod schema for validation
const signUpSchema = zod.object({
  username: zod.string().min(3).max(30),
  email: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  // getting username, password and email from request body
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  //   making an object of data received from request body
  const data = {
    username,
    password,
    email,
  };

  //   validating the schema using zod's safeParse() method
  const result = signUpSchema.safeParse(data);

  //   result.success will return either true or false
  if (result.success) {
    // checking if the username or email already exists
    const existringUseremail = await User.findOne({
      $or: [{ email }],
    });
    const existringUsername = await User.findOne({
      $or: [{ username }],
    });
    // if username or email exists in the database
    if (existringUseremail) {
      return res.status(400).json({
        message: "User with this email Id already exists, please use any other email Id",
      });
    }
    if (existringUsername) {
      return res.status(400).json({
        message: "username already exists, please create an unique username",
      });
    }

    // creating the usr in database
    try {
      await User.create({
        username: username,
        email: email,
        password: password,
      });

      const token = jwt.sign(username, JWT_SECRET);

      res.json({
        message: "User Created Successfully",
        token: token
      });
    } catch (error) {
      res.json({
        message: "User not created",
      });
    }
  } else {
    res.json({
      message: "entered Credentials are not valid",
    });
  }
});

module.exports = router;
