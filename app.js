// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const router = express.Router();
const logModel = require('./logModel');

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

// POST route to log NFC data
router.post('/api/log-nfc', async (req, res) => {
  console.log('Request Body:', req.body); // Add this to inspect the request body
  const { tagContent, action } = req.body;
  
  if (!tagContent || !action) {
    return res.status(400).send('NFC data is required'); // Handle missing fields explicitly
  }

  try {
    await logModel.createLog(tagContent, action);
    res.status(200).send('Log created');
  } catch (error) {
    res.status(500).send('Error creating log');
  }
});

// GET route to retrieve logs
router.get('/api/get-logs', async (req, res) => {
  try {
    const logs = await logModel.getAllLogs();
    res.status(200).json({ logs });
  } catch (error) {
    console.error('GET /api/get-logs Error:', error.message); // Log the actual error
    res.status(500).send('Error fetching logs'); // Keep the generic error for users
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(router);
module.exports = router;
