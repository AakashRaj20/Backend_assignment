const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();

const dbUrl = `postgres://postgres:2602@localhost:5432/user_auth`;
console.log(
  `postgres://${process.env.USERNAME_DB}:${process.env.PASSWORD}@${process.env.HOSTNAME}:${process.env.PORT_DB}/${process.env.DATABASE_NAME}`
);

// db.js
const sequelize = new Sequelize(dbUrl, {
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
    console.log(`Database connected`);
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
