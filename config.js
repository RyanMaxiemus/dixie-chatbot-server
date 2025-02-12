const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = ['PORT', 'BING_API_KEY'];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is required`);
  }
});

module.exports = {
  port: process.env.PORT,
  bingApiKey: process.env.BING_API_KEY,
};