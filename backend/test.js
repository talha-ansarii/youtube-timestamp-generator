const { Innertube } = require('youtubei.js');




const fetchTranscript = async () => {
    const youtube = await Innertube.create({
        lang: 'en',
        location: 'US',
        retrieve_player: false,
    });
    try {
        const info = await youtube.getInfo("znZs418fc_c");
        const transcriptData = await info.getTranscript();
        return transcriptData.transcript.content.body.initial_segments.map((segment) => segment.start_time_text + ' ' + segment.snippet.text).join('\n');
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw error;
    }
};

fetchTranscript().then((transcript) => {
    console.log(transcript);
});