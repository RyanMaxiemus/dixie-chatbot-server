const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;

/*
  The logger module exports a configured Winston logger instance that
  logs messages to the console, error.log, and combined.log files. The
  logger is configured to log messages at the 'info' level and above to
  the console, and messages at the 'error' level and above to the
  error.log file. All log messages are also written to the combined.log
  file. This configuration allows for different log levels to be
  specified for different transports, enabling more granular control
  over logging behavior.
*/
