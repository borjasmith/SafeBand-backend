const express = require('express');
const app = express();
const port = 3000;

// Mock database (in-memory for simplicity)
let nfcLogs = [];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive NFC data and save it
app.post('/api/log-nfc', (req, res) => {
  console.log('Request received:', req.body); // Log the incoming request

  const { nfcData } = req.body;
  if (nfcData) {
    const timestamp = new Date().toISOString();
    nfcLogs.push({ nfcData, timestamp });
    console.log('Saved NFC data:', { nfcData, timestamp }); // Log the saved data
    res.status(200).json({ message: 'NFC data logged successfully' });
  } else {
    console.error('No NFC data provided.'); // Log error
    res.status(400).json({ message: 'NFC data is required' });
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
