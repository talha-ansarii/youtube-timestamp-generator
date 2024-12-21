const { getVideoTranscript } = require('../services/transcriptService') ;
const { generateSummary } =  require('../services/summaryService');

 const getSummary = async (req, res) => {
  try {
    // Parse JSON body and extract videoUrl and style
    const { videoUrl, style } = req.body;

    // Validate videoUrl
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Fetch transcript
    const transcript = await getVideoTranscript(videoUrl);

    // Generate summary
    const summary = await generateSummary(transcript, style);

    // Return summary
    return res.status(200).json({ summary });
  } catch (error) {
    // Log error for debugging
    console.error('Error generating timestamps:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = { getSummary };
