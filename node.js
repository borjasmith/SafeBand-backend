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
    const { nfcData, action, timestamp } = req.body; // Ensure consistent structure
    if (!nfcData) {
      return res.status(400).json({ message: 'NFC data is required' });
    }

    nfcLogs.push({ tagContent: nfcData, action, timestamp }); // Use consistent keys
    res.status(200).json({ message: 'NFC data logged successfully' });
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
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
