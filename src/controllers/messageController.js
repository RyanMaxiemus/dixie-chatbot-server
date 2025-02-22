const { body, validationResult } = require('express-validator');
const { getOpenAIResponse } = require('../services/openaiService');
const logger = require('../utils/logger');

module.exports = [
  body('message').isString().notEmpty().withMessage('Message is required'), // Validate message field
  // Handle incoming POST requests
  async (req, res) => {
    const errors = validationResult(req); // Get validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Respond with validation errors
    }

    const userMessage = req.body.message; // Get user message from request body

    try {
      const botResponse = await getOpenAIResponse(userMessage); // Get response from OpenAI
      res.json({ message: botResponse }); // Respond with bot response
    } catch (error) {
      logger.error('Failed to get response from OpenAI: ', error); // Log error
      res.status(500).json({ error: 'Failed to get response from OpenAI. See server logs for details.' }); // Respond with error message
    }
  }
];

/*
  The messageController module exports an array of middleware functions
  that handle incoming POST requests to the /message route. The middleware
  validates the request body to ensure it contains a 'message' field that
  is a non-empty string. If the validation fails, the middleware responds
  with a 400 status code and an array of validation errors. If the validation
  succeeds, the middleware calls the getOpenAIResponse function from the
  openaiService module to generate a response to the user message. If the
  call to OpenAI is successful, the middleware responds with the bot response.
  If an error occurs during the API call, the middleware logs the error and
  responds with a 500 status code and an error message.
*/
