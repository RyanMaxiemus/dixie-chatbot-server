require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const winston = require('winston');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');
const { OpenAI } = require('openai');
const { body, validationResult } = require('express-validator');

// Create an Express app
const app = express();
const PORT = config.port;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware to secure the app by setting various HTTP headers
app.use(express.json());
app.use(helmet());

// Enable CORS for all routes
app.use(cors());

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Middleware to limit repeated requests to public APIs and/or endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);

// API endpoint to handle chat messages
app.post('/message', [
  body('message').isString().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.7, // Adjust creativity (0 = most predictable, 1 = most creative)
      max_tokens: 200, // Limit response length
    });

    const botResponse = completion.choices[0].message.content;
    res.json({ message: botResponse });
  } catch (error) {
    logger.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

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
