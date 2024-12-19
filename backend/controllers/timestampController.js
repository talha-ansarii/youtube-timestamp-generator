const transcriptService = require('../services/transcriptService');
const timestampService = require('../services/timestampService');

async function generateTimestamps(req, res) {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    const transcript = await transcriptService.getVideoTranscript(videoUrl);
    const timestamps = await timestampService.generateTimestamps(transcript);

    res.json({ timestamps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { generateTimestamps };
