const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 5 requests per windowMs
  message: "Too many requests. Exceeded rate limit.",
  statusCode: 429, // Status code for rate limit exceeded
});

module.exports = {limiter};
