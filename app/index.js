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
  const message = 'Welcome to the chat app';
  socket.emit('serverSentMessage', message);
  socket.broadcast.emit('serverSentMessage', 'A new user has joined');

  socket.on('clientSentMessage', msg => {
    io.emit('serverSentMessage', msg);
  });
});

server.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
