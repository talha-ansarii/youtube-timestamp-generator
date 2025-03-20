const { YoutubeTranscript } = require ('youtube-transcript');
const { Innertube } = require('youtubei.js');




const getVideoTranscript = async (url) => {
  const videoId = url.split('v=')[1];
    const youtube = await Innertube.create({
        lang: 'en',
        location: 'US',
        retrieve_player: false,
    });
    try {
        const info = await youtube.getInfo(videoId);
        const transcriptData = await info.getTranscript();
        return transcriptData.transcript.content.body.initial_segments.map((segment) => segment.start_time_text + ' ' + segment.snippet.text).join('\n');
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw error;
    }
};



//  async function getVideoTranscript(videoUrl) {
//   try {
//     // console.log("in trans service" , videoUrl)
//     const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
//     if (!transcript) {
//       throw new Error('No transcript available for this video');
//     }

//     return toString(transcript);
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transcript';
//     throw new Error(`Failed to get transcript: ${errorMessage}`);
//   }
// }

function toString(transcript) {
  let result = "00:00 - Introduction\n";

  transcript.forEach((entry) => {
    const timestamp = formatTimestamp(entry.offset);
    result += `${timestamp} - ${entry.text.replace(/&amp;#39;/g, "'")}\n`;
  });

  return result;
}

function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
}

module.exports = { getVideoTranscript };