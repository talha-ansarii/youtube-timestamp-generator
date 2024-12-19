const googleAIConfig = require('../config/googleAIConfig');

async function generateTimestamps(transcript) {
  try {
    const model = googleAIConfig.getGenerativeModel();

    const prompt = `
      Given the following video transcript, generate meaningful timestamps and chapter titles based on the content of the transcript.
      The goal is to segment the video into chapters at logical points, each with an appropriate title. 
      Ensure that the chapter titles are concise and reflect the content of the text. 
      The timestamps should be in the format MM:SS and should not exceed the total duration of the video.
      
      Format the output as follows:
      00:00 - Introduction
      MM:SS - Chapter Title
    
      Transcript:
      ${transcript}
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error(`Failed to generate timestamps: ${error.message}`);
  }
}

module.exports = { generateTimestamps };
