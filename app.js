// const express = require('express');
// const app = express();

// const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

// const cors = require('cors');

// // Allow all origins or specify your frontend domain
// app.use(cors({
//   origin: frontendUrl,
// }));

// app.use(express.json());

// // Your routes and middleware here
// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// module.exports = app;

// NUEVO

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Set frontend URL from environment variable (assuming it's set in `.env`)
const frontendUrl = process.env.FRONTEND_URL; // or replace with hardcoded URL

// Mock database (in-memory for simplicity)
let nfcLogs = [];

// Middleware to allow CORS from the frontend URL
app.use(cors({
  origin: frontendUrl || '*', // Allow all origins if no frontend URL is specified
}));

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Endpoint to receive NFC data and save it
app.post('/api/log-nfc', (req, res) => {
  try {
    const { nfcData, action, timestamp } = req.body;
    if (!nfcData) {
      res.status(400).type('text/plain').send('NFC data is required');
      return;
    }

    // Store NFC log
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

