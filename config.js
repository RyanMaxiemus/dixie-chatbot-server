const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = [
                          'PORT',
                          'OPENAI_API_KEY',
                          'GOOGLE_GEN_LANG_API_KEY',
                          'GOOGLE_SEARCH_API_KEY'
                        ];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is required`);
  }
});

module.exports = {
  port: process.env.PORT,
  openaiApiKey: process.env.OPENAI_API_KEY,
  googleGenLangApiKey: process.env.GOOGLE_GEN_LANG_API_KEY,
  googleSearchApiKey: process.env.GOOGLE_SEARCH_API_KEY
};