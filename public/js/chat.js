const socket = io();
socket.on('countUpdated', count =>
  console.log('countUpdated, count is:', count)
);

document.querySelector('#increment').addEventListener('click', () => {
  console.log('increment button clocked');
  socket.emit('countIncremented');
});
