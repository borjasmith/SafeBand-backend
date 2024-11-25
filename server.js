// server.js
const http = require('http');
const app = require('./app');
const { hostname } = require('os');
const { Client } = require('pg');
require('dotenv').config();

const port = process.env.PORT || 3000; // Use Render's environment port

const server = http.createServer(app);

server.listen(port, hostname(), () => {
    console.log(`Started on port ${port}`);
});

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



