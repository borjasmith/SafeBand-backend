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
      res.status(400).type('text/plain').send('NFC data is required');
      return;
    }

    // Store NFC log (adjust structure as needed)
    nfcLogs.push({ tagContent: nfcData, action, timestamp });

    // Send a plain text response
    res.status(200).type('text/plain').send('NFC data logged successfully');
  } catch (error) {
    console.error('Error processing request:', error.message);

    // Send a plain text error response
    res.status(500).type('text/plain').send('Internal server error');
  }
});




// Endpoint to get NFC logs
app.get('/api/get-logs', (req, res) => {
  console.log('Fetching NFC logs...');
  res.status(200).json({ logs: nfcLogs });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
