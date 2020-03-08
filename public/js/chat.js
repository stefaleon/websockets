const socket = io();

socket.on('welcomeSent', msg => {
  console.log(msg);
  document.querySelector('#message').innerHTML = msg;
});
