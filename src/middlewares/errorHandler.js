const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

/*
  The errorHandler middleware is a catch-all error handler that logs
  any unhandled errors and sends a generic error response with a 500
  status code. This middleware is used to handle errors that occur
  during request processing and ensure that the server responds
  appropriately even in the presence of unexpected errors. By logging
  the error stack trace and sending a generic error response, the
  errorHandler middleware provides visibility into the error and
  communicates to the client that an error occurred.
*/