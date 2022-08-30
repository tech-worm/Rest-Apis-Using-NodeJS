// http module to create server
const http = require('http');
// importing app module
const app = require('./app');


// defining and declearing port
const port = process.env.PORT || 5000;
// creating server using http module and passed the app from app module
const server = http.createServer(app);
// server is listening on the decleared port
server.listen(port);