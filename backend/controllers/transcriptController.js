

import { getVideoTranscript } from '../services/transcriptService';

export const getTranscript = async (req, res) => {
  try {
    // Parse JSON body and extract videoUrl
    const { videoUrl } = req.body;

    // Validate videoUrl
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Fetch transcript
    const transcript = await getVideoTranscript(videoUrl);

    // Return transcript
    return res.status(200).json({ transcript });
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching video transcript:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};
