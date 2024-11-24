const express = require('express');
const app = express();
const port = 3000;

// Mock database (in-memory for simplicity)
let nfcLogs = [];

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive NFC data and save it
app.post('/api/log-nfc', (req, res) => {
  try {
    const { nfcData } = req.body;
    if (!nfcData) {
      console.error('No NFC data provided.');
      return res.status(400).json({ message: 'NFC data is required' });
    }

    const timestamp = new Date().toISOString();
    nfcLogs.push({ nfcData, timestamp });
    console.log('Saved NFC data:', { nfcData, timestamp });

    // Always return a JSON response
    res.status(200).json({ message: 'NFC data logged successfully' });
  } catch (error) {
    console.error('Error processing request:', error.message);

    // Return a valid JSON error response
    res.status(500).json({ message: 'Internal server error' });
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
