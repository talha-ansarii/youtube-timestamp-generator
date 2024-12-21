import { getVideoTranscript } from '../services/transcriptService';
import { generateSimpliedText } from '../services/mindMapService';

export const getSimplefied = async (req, res) => {
  try {
    // Parse JSON body and extract videoUrl
    const { videoUrl } = req.body;

    // Validate videoUrl
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Fetch transcript
    const transcript = await getVideoTranscript(videoUrl);
    // console.log(transcript);

    // Generate simplified text
    const simplifiedText = await generateSimpliedText(transcript);

    // Return simplified text
    return res.status(200).json({ simplifiedText });
  } catch (error) {
    // Log error for debugging
    console.error('Error processing video transcript:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};
