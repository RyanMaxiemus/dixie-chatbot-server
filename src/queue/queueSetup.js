const Queue = require('bull');
const messageQueueProcessor = require('./messageQueueProcessor');
const logger = require('../logger');

// Create a new message queue
const messageQueue = new Queue('messageQueue', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
});

messageQueue.process(messageQueueProcessor); // Attach the processor

// Event listener for job completion
messageQueue.on('completed', (job, result) => {
  logger.info(`Job ${job.id} completed with result: ${result}`);
});

// Event listener for job failure
messageQueue.on('failed', (job, error) => {
  logger.error(`Job ${job.id} failed with error: ${error}`);
});

module.exports = { messageQueue }; // Export the message queue

/*
  In this snippet, we set up a Bull queue for processing messages.
  We create a new messageQueue instance with a connection to a local
  Redis server. We attach a messageQueueProcessor function to process
  messages from the queue. We also define event listeners for the
  'completed' and 'failed' events to log the results of the processing.
*/
