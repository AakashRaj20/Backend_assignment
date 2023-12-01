//importing modules
const express = require("express");
const db = require("../model");
const jwt = require("jsonwebtoken");
const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).json({ message: "Username already exist" });
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({ message: "Email already exist" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }
    jwt.verify(token, process.env.secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveUser,
  authenticateUser,
};
