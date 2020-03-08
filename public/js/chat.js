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

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('locationSent', {
      lat: position.coords.latitude,
      long: position.coords.longitude
    });
  });
});
