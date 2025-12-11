const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // 5 requests لكل IP
  message: "Too many requests, please try again later.",
});

module.exports = contactLimiter;
