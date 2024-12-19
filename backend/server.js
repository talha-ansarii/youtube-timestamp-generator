const express = require('express');
const cors = require('cors');
const timestampController = require('./controllers/timestampController');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/generate-timestamps', timestampController.generateTimestamps);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});