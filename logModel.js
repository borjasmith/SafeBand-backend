// logModel.js
const { Client } = require('pg');
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

const createLog = async (tagContent, action) => {
  try {
    await client.connect();

    // Ensure the `logs` table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        tagContent TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the log entry
    const result = await client.query(
      'INSERT INTO logs(tagContent, action) VALUES($1, $2)',
      [tagContent, action]
    );
    console.log('Log created:', result);
    return result;
  } catch (error) {
    console.error('Error creating log:', error.message);
    throw error;
  } finally {
    await client.end(); // Close the connection after the query
  }
};

// Get all logs
const getAllLogs = async () => {
  try {
    const logs = await client.query('SELECT * FROM logs ORDER BY timestamp DESC');
    return logs.rows;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};

module.exports = { createLog, getAllLogs };
