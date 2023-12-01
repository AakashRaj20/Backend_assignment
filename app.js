//importing modules
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./model");
const userAuth = require("./middleware/userAuth");
const limiter = require("./middleware/rateLimiter");
const userRoutes = require("./routes/userRoutes");

//setting up your port
const PORT = 8080;

//assigning the variable app to express
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ alter: true }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use(
  "/api/protected",
  userAuth.authenticateUser,
  limiter.limiter,
  userRoutes
);
app.use("/api/users", userRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
