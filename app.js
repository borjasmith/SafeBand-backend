const express = require('express');
const app = express();

app.use(express.json());

// Your routes and middleware here
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
