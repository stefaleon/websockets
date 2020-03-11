const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const { createMessageObject } = require('./utils');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
  console.log('new websocket connection');

  socket.emit(
    'serverSentMessage',
    createMessageObject({ text: 'Welcome to the chat app' })
  );
  //socket.broadcast.emit('userConnection', 'A new user has joined');

  socket.on('userJoined', userName => {
    console.log('user joined', userName);
    socket.broadcast.emit('userConnection', `${userName} has joined`);
  });

  socket.on('clientSentMessage', (msg, ackCallback) => {
    console.log('testttt', msg);
    if (msg.messageText.trim().length < 1) {
      return ackCallback('Cannot emit empty messages');
    }
    if (msg.messageText.trim() === 'kkk') {
      return ackCallback('Cannot say "kkk"');
    }
    io.emit(
      'serverSentMessage',
      createMessageObject({ user: msg.userName, text: msg.messageText })
    );
    ackCallback();
  });

  socket.on('disconnect', () => {
    io.emit('userConnection', 'A user has disconnected');
  });

  socket.on('locationSent', (obj, callback) => {
    io.emit(
      'serverSentLocationMessage',
      createMessageObject({
        user: obj.userName,
        text: `https://google.com/maps?q=${obj.lat},${obj.long}`
      })
    );
    callback();
  });
});

server.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
