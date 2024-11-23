const express = require('express');
const app = express();
const port = 3000;

// Mock database (in-memory for simplicity)
let nfcLogs = [];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive NFC data and save it
app.post('/api/log-nfc', (req, res) => {
  const { nfcData } = req.body;
  if (nfcData) {
    const timestamp = new Date().toISOString();
    nfcLogs.push({ nfcData, timestamp });
    res.status(200).send({ message: 'NFC data logged successfully' });
  } else {
    res.status(400).send({ message: 'NFC data is required' });
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
