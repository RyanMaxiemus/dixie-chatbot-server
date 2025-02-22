const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./src/config');
const rateLimiter = require('./src/middlewares/rateLimiter');
const errorHandler = require('./src/middlewares/errorHandler');
const messageController = require('./src/controllers/messageController');
const logger = require('./src/utils/logger');

// Create an Express app
const app = express();
const PORT = config.port;

app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Set various HTTP headers for security
app.use(cors()); // Enable CORS for all routes

// Apply rate limiting middleware
app.use(rateLimiter);

// API endpoint to handle chat messages
app.post('/message', messageController);

// Error handling middleware
app.use(errorHandler);

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});
