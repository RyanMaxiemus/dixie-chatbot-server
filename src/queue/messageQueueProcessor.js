const { getOpenAIResponse } = require('../services/openaiService');
const logger = require('../logger');

// Function to process a message from the queue
module.exports = async (job) => {
  const { userMessage } = job.data; // Get the user message from the job data

  try {
    const botResponse = await getOpenAIResponse(userMessage);
    return botResponse;
  } catch (error) { // Catch any errors and log them
    logger.error('Error processing message from queue: ', error);
    throw error;
  }
}

/* 
  In this snippet, we define a messageQueueProcessor function that
  processes messages from the Bull queue. The function receives a job
  object as an argument, which contains the user message to process.
  We extract the user message from the job data and call the
  getOpenAIResponse function from the openaiService module to generate
  a response. If an error occurs during processing, we log the error
  and re-throw it for handling in the queueSetup module.
*/
