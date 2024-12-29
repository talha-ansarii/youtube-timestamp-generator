const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = "AIzaSyAmal4Q_lG7Be0YMdfaNURig6D9W1GKiAM"// process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

function getGenerativeModel() {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
}

module.exports = { getGenerativeModel };
