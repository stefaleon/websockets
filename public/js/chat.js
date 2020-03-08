const socket = io();
socket.on('countUpdated', count =>
  console.log('countUpdated, count is:', count)
);
