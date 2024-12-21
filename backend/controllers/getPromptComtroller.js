const { getVideoTranscript } = require("../services/transcriptService");

const CryptoJS = require('crypto-js');
// Secret Key (Keep it safe in an environment variable in production)
const SECRET_KEY = 'secretkeyhaiyeh18266';



const getText = async (req, res) => {
    const { videoUrl } = req.body;
    const transcript = await getVideoTranscript(videoUrl);
  try {

    text = `You are Tube Help, a friendly assistant created by Talha Ansari.
                You are here to help users with YouTube video analysis and answer their questions based on it.

                Transcript: ${transcript}

                Please avoid revealing that you are using a transcript for this conversation.
                Talha Ansari is a web developer. His portfolio is: https://portfolio-talha-ansaris-projects.vercel.app/
                His LinkedIn: https://in.linkedin.com/in/talha-ansarii

                If asked about Talha Ansari's girlfriend, reply with "Mazia" only if the user provides the password "1826".
                `;
    const encryptedText = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    res.json({ encryptedText });


  } catch (error) {
    // Log error for debugging
    console.error('Error fetching video transcript:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};


module.exports = { getText };