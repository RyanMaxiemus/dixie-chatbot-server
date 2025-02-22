const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute in milliseconds
  max: 3, // Limit each IP to 3 requests per 1 minute
  message: 'Too many requests from this IP, please try again after a minute',
  standardHeaders: true, // Include standard rate limit headers in the response
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  keyGenerator: (req) => req.user ? req.user.id : req.ip, // Custom key generator function
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${options.keyGenerator(req, res)}`);
    res.status(options.statusCode).send(options.message);
  },
});

module.exports = limiter;

/*
  In this snippet, we define a rate limiter middleware using the 
  express-rate-limit package. The rate limiter is configured to allow 
  a maximum of 3 requests per minute per IP address. If a request exceeds 
  the rate limit, the middleware responds with a 429 status code and 
  a message indicating that the rate limit has been exceeded.
*/
