const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: 5432,
});

pool.query("SELECT * FROM users", (error, results) => {
  if (error) {
    throw error;
  }
  console.log(results.rows);
});

// Close the pool when your application is finished
pool.end();

module.exports = pool;
