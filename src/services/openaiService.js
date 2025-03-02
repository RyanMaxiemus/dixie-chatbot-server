const { OpenAI } = require('openai');
const config = require('../config');
const logger = require('../logger');

const openai = new OpenAI({ apiKey: config.openaiApiKey });
const OPENAI_MODEL = 'gpt-4o';

// Function to get a response from OpenAI
async function getOpenAIResponse(userMessage) {
  try {
    // Call the OpenAI API to generate a response
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [{ role: 'user', content: userMessage }],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0].message.content; // Return the bot response
  } catch (error) { // Catch any errors and log them
    logger.error('OpenAI API Error: ', error);
    throw new Error('Failed to get response from OpenAI'); // Re-throw for handling in route
  }
}

module.exports = { getOpenAIResponse };

/*
  The openaiService module exports a getOpenAIResponse function that
  interacts with the OpenAI API to generate a response to a user message.
  The function takes the user message as input, calls the OpenAI API to
  generate a response using the GPT-4o model, and returns the bot
  response. If an error occurs during the API call, the function logs the
  error and re-throws it for handling in the calling module.
*/
