const { Pool } = require('pg');

// Initialize the connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT,
});

// Create a log
const createLog = async (tagContent, action) => {
  try {
    // Ensure the `logs` table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        tagContent TEXT NOT NULL,
        action TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the log entry
    const result = await pool.query(
      'INSERT INTO logs(tagContent, action) VALUES($1, $2)',
      [tagContent, action]
    );
    console.log('Log created:', result);
    return result;
  } catch (error) {
    console.error('Error creating log:', error.message);
    throw error;
  }
};

// Get all logs
const getAllLogs = async () => {
  try {
    const logs = await pool.query('SELECT * FROM logs ORDER BY timestamp DESC');
    return logs.rows;
  } catch (error) {
    console.error('Error fetching logs:', error.message);
    throw error;
  }
};

module.exports = { createLog, getAllLogs };
