const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
  console.log('new websocket connection');
  socket.emit('myEvent');
});

server.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
