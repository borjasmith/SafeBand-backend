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
  console.log(req.body);  // Log the body of the request
  const { tagContent, action } = req.body;
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
    res.status(500).send('Error fetching logs');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(router);
module.exports = router;
