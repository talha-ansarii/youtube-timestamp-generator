const { YoutubeTranscript } = require('youtube-transcript');

async function getVideoTranscript(videoUrl) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    if (!transcript) {
      throw new Error('No transcript available for this video');
    }

    return toString(transcript);
  } catch (error) {
    throw new Error(`Failed to get transcript: ${error.message}`);
  }
}

function toString(transcript) {
  let result = "00:00 - Introduction\n"; // Starting point

  transcript.forEach((entry) => {
    const timestamp = formatTimestamp(entry.offset);
    result += `${timestamp} - ${entry.text.replace(/&amp;#39;/g, "'")}\n`;
  });

  return result;
}

function formatTimestamp(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

module.exports = { getVideoTranscript };
