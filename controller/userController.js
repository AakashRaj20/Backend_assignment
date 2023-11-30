//importing modules
const bcrypt = require("bcrypt");
const db = require("../model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
      //console.log("user", JSON.stringify(user, null, 2));
      //console.log(token);
      //send users details
      return res.status(201).json({ user: user, token: token });
    } else {
      return res
        .status(409)
        .json("Failed to create user. Please check your details.");
    }
  } catch (error) {
    // Handle specific errors
    // if (error.name === "SequelizeUniqueConstraintError") {
    //   return res
    //     .status(409)
    //     .json({ message: "Username or email is already taken." });
    // }

    console.error("Error in signup:", error);
    // For other errors, provide a generic message
    //return res.status(500).json({message: error.message});
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        //console.log("user", JSON.stringify(user, null, 2));
        //console.log(token);
        //send user data
        return res.status(201).json({ user: user, token: token });
      } else {
        return res.status(401).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
};
