require('dotenv').config(); // Load environment variables from .env file
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to handle user messages
app.post('/message', (req, res) => { // req is the request object, res is the response object
  const userMessage = req.body.message; // Extract the message from the request body
  console.log(`Received message from user: ${userMessage}`); // Debugging log

  // For now, simply echo the user's message back
  res.json({ message: userMessage });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Debugging log
});
