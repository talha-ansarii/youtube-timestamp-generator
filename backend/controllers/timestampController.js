const { getVideoTranscript } = require('../services/transcriptService');
const {generateTimestamps } = require('../services/timestampService');


const generateTimestampsHandler = async (req, res) => {
  try {
    // Parse body and extract videoUrl
    const { videoUrl } = req.body;

    // Validate videoUrl
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Fetch transcript
    const transcript = await getVideoTranscript(videoUrl);

    // Generate timestamps
    const timestamps = await generateTimestamps(transcript);

    // Return timestamps
    return res.status(200).json({ timestamps });
  } catch (error) {
    // Log error for debugging
    console.error('Error generating timestamps:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = {generateTimestampsHandler}