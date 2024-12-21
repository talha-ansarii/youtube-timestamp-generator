const express = require('express');
const cors = require('cors');
const { generateTimestampsHandler } = require('./controllers/timestampController');
const { getSummary } = require('./controllers/summaryController');
const { getSimplefied } = require('./controllers/simplifiedtextController');
const { getQuiz } = require('./controllers/quizController');
const { getTranscript } = require('./controllers/transcriptController');

const app = express();

app.use(cors()); 
app.use(express.json());

// Routes
app.post('/api/timestamps', generateTimestampsHandler);
app.post('/api/summary', getSummary);
app.post('/api/simpletext', getSimplefied);
app.post('/api/quiz', getQuiz);
app.post('/api/transcript', getTranscript);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});