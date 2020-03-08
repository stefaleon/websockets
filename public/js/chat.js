const socket = io();

socket.on('serverSentMessage', msg => {
  console.log(msg);
  document.querySelector('#message').innerHTML = msg;
});

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();

  const clientMessage = document.querySelector('input').value;

  socket.emit('clientSentMessage', clientMessage);
});
