// db.js

const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();

// db.js
const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOSTNAME,
  port: process.env.PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Other configurations...


sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// connecting to the model
db.users = require("./userModel")(sequelize, DataTypes);

module.exports = db;
