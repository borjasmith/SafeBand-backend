const http = require('http');
const app = require('./app');
const { hostname } = require('os');

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, hostname(), () => {
    console.log(`Started on port ${port}`);
});
