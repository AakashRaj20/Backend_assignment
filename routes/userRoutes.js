const express = require("express");
const userController = require("../controller/userController");
const { signup, login } = userController;
const secureEndpoints = require("../controller/secureEndpoints");
const { secureEndpoint } = secureEndpoints;
const userAuth = require("../middleware/userAuth");

const router = express.Router();

//signup route
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

//protected route
router.get("/secureEndpoint", secureEndpoint);

module.exports = router;
