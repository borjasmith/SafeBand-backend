const http = require('http');
const app = require('./app');
const { hostname } = require('os');

const port = process.env.PORT || 3000; // Use Render's environment port

const server = http.createServer(app);

server.listen(port, hostname(), () => {
    console.log(`Started on port ${port}`);
});
