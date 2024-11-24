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
    const { nfcData, action, timestamp } = req.body;

    if (!nfcData) {
      return res.status(400).type('text/plain').send('NFC data is required');
    }

    // Add log to the in-memory array
    nfcLogs.push({ tagContent: nfcData, action, timestamp });
    console.log('Saved NFC log:', { tagContent: nfcData, action, timestamp });

    res.status(200).type('text/plain').send('NFC data logged successfully');
  } catch (error) {
    console.error('Error logging NFC data:', error.message);
    res.status(500).type('text/plain').send('Internal server error');
  }
});





// Endpoint to get NFC logs
app.get('/api/nfc-logs', (req, res) => { // Changed endpoint to match frontend
  res.status(200).json({ logs: nfcLogs }); // Wrap logs in an object for consistency
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
