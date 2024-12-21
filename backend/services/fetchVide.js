
const YouTube = require("youtube-sr") ;



export const fetchVideoByURL = async (url)=> {
  try {
    const video = await YouTube.getVideo(url);
    return {
      id: video?.id || "",
      title: video?.title || "Unknown title",
      description: video.description || "No description available",
      duration: video.durationFormatted || "Unknown duration",
      thumbnail: video.thumbnail?.url || "",
      views: video.views.toLocaleString() || "0",
      channel: video.channel?.name || "Unknown channel",
      url: `https://www.youtube.com/watch?v=${video.id}`,
    };
  } catch (error) {
    console.log("Error fetching video details:", error);
    return null;
  }
};
