import { getVideoTranscript } from '../services/transcriptService';
import { generateQuiz } from '../services/quizService';

export const getQuiz = async (req, res) => {
  try {
    // Parse JSON body and extract videoUrl
    const { videoUrl } = req.body;

    // Validate videoUrl
    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    // Fetch transcript
    const transcript = await getVideoTranscript(videoUrl);

    // Generate quiz
    const quiz = await generateQuiz(transcript);

    // Return quiz
    return res.status(200).json({ quiz });
  } catch (error) {
    // Log error for debugging
    console.error('Error processing video quiz:', error);

    // Handle errors gracefully
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage });
  }
};
