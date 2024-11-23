const express = require('express');
const app = express();
const port = 3000;

// Mock database (in-memory for simplicity)
let nfcLogs = [];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive NFC data and save it
app.post('/api/log-nfc', (req, res) => {
  const { tagContent } = req.body;
  if (tagContent) {
    const timestamp = new Date().toISOString();
    nfcLogs.push({ tagContent, timestamp });
    res.status(200).send({ message: 'NFC data logged successfully' });
  } else {
    res.status(400).send({ message: 'Tag content is required' });
  }  
});

// Endpoint to get NFC logs
app.get('/api/get-logs', (req, res) => {
  res.status(200).json(nfcLogs);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
