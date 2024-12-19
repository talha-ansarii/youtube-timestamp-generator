const googleAIConfig = require('../config/googleAIConfig');

async function generateTimestamps(transcript) {
  try {
    const model = googleAIConfig.getGenerativeModel();

    const prompt = `
      Given the following video transcript, generate meaningful timestamps and chapter titles based on the content of the transcript.
      The goal is to segment the video into chapters at logical points, each with an appropriate title. 
      Ensure that the chapter titles are concise and reflect the content of the text. 
      Make a logical time gap between chapters to indicate a new section of the video.
      Also make the timestamps according to the video length.
     

      Format the output as follows:
      00:00 - Introduction
      MM:SS - Chapter Title
      HH:MM:SS - Chapter Title (if the video is longer than an hour)
    
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
