const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const { YoutubeTranscript }  = require('youtube-transcript');
const app = express();
app.use(cors());
app.use(express.json());

// Load API key from environment variable (more secure)
const apiKey = "AIzaSyDAyKyppuLVnd8mLyYpIudOe3STcVw2Qng"

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

async function getVideoTranscript(videoUrl) {
  try {
    console.log("fetching video info")
    const transcript =  await YoutubeTranscript.fetchTranscript(videoUrl)
    // const info = await ytdl.getInfo(videoUrl);
    // Get auto-generated transcript if available
    // console.log(info)
    // const transcript = info.player_response.captions?.playerCaptionsTracklistRenderer
    //   ?.captionTracks?.[0]?.baseUrl;

    if (!transcript) {
      throw new Error('No transcript available for this video');
    }
    // console.log(transcript)

    // const text = transcript.replace(/<[^>]*>/g, '');
    // console.log(text)
    // Parse XML transcript and convert to plain text
    // This is a simplified version - you'll need proper XML parsing
    return transcript.map(item => `${item.start} - ${item.text}`).join('\n');
  } catch (error) {
    throw new Error(`Failed to get transcript: ${error.message}`);
  }
}

async function generateTimestamps(transcript) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Changed to gemini-1.5-flash

    const prompt = `
      Given the following video transcript, generate meaningful timestamps/chapters.
      Format the output as follows:
      00:00 - Introduction
      MM:SS - Chapter Title
  
      Transcript:
      ${transcript}
    `;

    const result = await model.generateContent(prompt);
    const timestamps = result.response.text();
    return timestamps;
  } catch (error) {
    throw new Error(`Failed to generate timestamps: ${error.message}`);
  }
}

app.post('/api/generate-timestamps', async (req, res) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    const transcript = await getVideoTranscript(videoUrl);
    const timestamps = await generateTimestamps(transcript);

    res.json({ timestamps });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});