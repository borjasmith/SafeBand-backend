const express = require('express');
const cors = require('cors');
const http = require('http');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const router = express.Router();

// Use Render's environment port or default to 3000
const port = process.env.PORT || 3000;

// Set frontend URL from environment variable
const frontendUrl = process.env.FRONTEND_URL;

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
  console.log('Request Body:', req.body);
  const { tagContent, action } = req.body;
  
  if (!tagContent || !action) {
    return res.status(400).send('NFC data is required');
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
    console.error('GET /api/get-logs Error:', error.message);
    res.status(500).send('Error fetching logs');
  }
});

app.use(router);

// Create the server
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Connect to PostgreSQL
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = app;
