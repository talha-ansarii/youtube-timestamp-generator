const {getGenerativeModel} = require('../config/googleAIConfig') ;

 async function generateQuiz(transcript) {
  try {
    const model = getGenerativeModel();

    let prompt = `generate 10 quiz questions based on the following transcript:\n\n${transcript}\n\nQuestions:
    
            give responses in html format without any <ul></ul> <li></li> tags use <b> tag for bold text`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate timestamps';
    throw new Error(`Failed to generate timestamps: ${errorMessage}`);
  }
}

module.exports = { generateQuiz };
